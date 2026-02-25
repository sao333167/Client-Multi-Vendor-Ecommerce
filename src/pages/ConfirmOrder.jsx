import React, { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import error from '../assets/images/error.png'
import success from '../assets/images/success.png'
import { Link } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import axios from 'axios';

const load = async () => {
    return await loadStripe('pk_test_51QhWLsF94OSju3iyT3x7btXeusXKV6rXyVntzenEVd8QUgMt5yaHdWTXv7AzkbaCkfQdg251kEAJu9joleTcCgBw00yYsrx1WV');
    
}



export default function ConfirmOrder() {
    const [loader,setLoader] = useState(true);
    const [stripe,setStripe] = useState('');
    const [message,setMessage] = useState(null);

    const get_load = async()=>{
        const tempStripe = await load();
        setStripe(tempStripe);
        setLoader(false);
    }

    useEffect(()=>{
        if(!stripe){
            return;
        }

        const params = new URLSearchParams(window.location.search);
        const redirectStatus = params.get('redirect_status');
        const clientSecret = params.get('payment_intent_client_secret');

        // If Stripe redirected back with a redirect_status param, use it first
        if (redirectStatus) {
            if (redirectStatus === 'succeeded') {
                setMessage('succeeded');
            } else if (redirectStatus === 'processing') {
                setMessage('processing');
            } else {
                setMessage('failed');
            }
            return;
        }

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then((result)=>{
            const paymentIntent = result && result.paymentIntent;
            const status = paymentIntent && paymentIntent.status;
            if (!status) {
                setMessage('failed');
                return;
            }
            switch(status){
                case "succeeded":
                    setMessage('succeeded')
                    break
                case "processing":
                    setMessage('processing')
                    break
                case "requires_payment_method":
                    setMessage('failed')
                    break
                default:
                    setMessage('failed')
                    break;
            }
        }).catch((err)=>{
            console.error('retrievePaymentIntent error', err);
            setMessage('failed');
        })
    },[stripe])

    useEffect(()=>{
        get_load();
    },[])

    const update_payment = async()=>{
        const orderId = localStorage.getItem('orderId');
        try{
            await axios.get(`http://localhost:5000/api/order/confirm/${orderId}`,{withCredentials:true});
            localStorage.removeItem('orderId');
            setLoader(false);
        }catch(err){
            console.log(err);
        }
    }

        useEffect(()=>{
            if(message === 'succeeded'){
                update_payment();
            }
        },[message])

  return (
    <div className='w-screen h-screen flex justify-center items-center flex-col gap-4'>
        {
              (message === 'failed' || message === 'processing') ? <>
                <img src={error} alt="" />
                <Link className='px-5 py-2 bg-green-500 rounded-sm text-white' to="/dashboard/my-orders">Back to Dashboard </Link>
                </> : message === 'succeeded' ? loader ? <FadeLoader/> : <>
                <img src={success} alt="" />
                <Link className='px-5 py-2 bg-green-500 rounded-sm text-white' to="/dashboard/my-orders">Back to Dashboard </Link>
                </> : <FadeLoader/> 
        }
    </div>
  )
}
