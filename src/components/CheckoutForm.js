import React, { useState } from 'react'
import { PaymentElement,LinkAuthenticationElement,useStripe,useElements } from '@stripe/react-stripe-js'

export default function CheckoutForm({orderId}) {

    localStorage.setItem('orderId',orderId);
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const[isLoading,setIsLoading] = useState(false);

    const paymentElementOption = {
        layout: "tabs",
    }
    const submit = async(e)=>{
        e.preventDefault();
        if(!stripe || !elements){
            return;
        }
        setIsLoading(true);

        const {error} = await stripe.confirmPayment({
            elements,
            confirmParams:{
                return_url:'http://localhost:3000/order/confirm',
            },
        });
        if(error.type === "card_error" || error.type === "validation_error"){
            setMessage(error.message);
        }else{
            setMessage("An unexpected error occured.");
        }
        setIsLoading(false);
    }

  return (
    <form onSubmit={submit} id='payment-form'>
        <LinkAuthenticationElement id='link-authentication-element'/>
        <PaymentElement id='payment-element' options={paymentElementOption}/>
        <button disabled={isLoading || !stripe || !elements} id='submit' className='px-10 py-[6px] rounded-sm hover:shadow-green-500/20 hover:shadow-lg bg-[#059473] text-white mt-4'>
            <span id='button-text'> {isLoading ? <div className='spinner' id='spinner'>Loading...</div> : "Pay Now"}</span>
        </button>
        {message && <div id='payment-message'>{message}</div>}
    </form>
  )
}

// http://localhost:3000/order/confirm?payment_intent=pi_3SxiaDF94OSju3iy138bsQ7h&payment_intent_client_secret=pi_3SxiaDF94OSju3iy138bsQ7h_secret_Phf3OTPrhvfM4ByJt9ZFeMwu5&redirect_status=succeeded