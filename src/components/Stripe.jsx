import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import axios from 'axios'
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51SvcduQM24Gh0OD2vpAunlRLLzAsHJhIEtlkbFzMr5rR3yzF6kOUFQQMTGKp3qHFqfshFNDWua6ktikYSn2yk5fb00bxWbgKw4');

export default function Stripe({price, orderId}) {
  const [clientSecret, setClientSecret] = React.useState("");
  const apperance = {
    theme: 'stripe',
  };
  const options = {
    apperance,  
    clientSecret,
  }

const create_payment = async()=>{
    try{
        const {data} = await axios.post('http://localhost:5000/api/order/create-payment',{price},{withCredentials:true});
        setClientSecret(data.clientSecret);
    }catch(err){
        console.log(err);
    }
}

  return (
    <div className='mt-4'>
        {
          clientSecret ? (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm orderId={orderId}/>
              {/* Your CheckoutForm component goes here */}
            </Elements>):<button onClick={create_payment} className='px-10 py-[6px] rounded-sm hover:shadow-green-700 hover:shadow-lg bg-green-500 text-white'>Start Payment </button>
        }
    </div>
  )
}
