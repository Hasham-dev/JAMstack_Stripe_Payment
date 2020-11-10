import React from "react"
import { loadStripe } from "@stripe/stripe-js"

export default function Home() {

  const redirectToCheckout = async event => {
    event.preventDefault()
    const stripe = await loadStripe("pk_test_51HlhtPAHq5PnEw7coOJtxDLj5kHUt9e6RAnryPcvIQb9xjYEglrOgDBlSVSNfuzAYQk820kbI5JwJE6FWcPwA9ZT00gPXP7OtP")
    const { error } = await stripe.redirectToCheckout({
      mode: "payment",
      lineItems: [{ price: "price_1Hlhu4AHq5PnEw7cXOMgDV6N", quantity: 1 }],
      successUrl: `http://localhost:8000/success/`,
      cancelUrl: `http://localhost:8000/error/`,
    })
    if (error) {
      console.warn("Error:", error)
    }
  }

  return <button onClick={redirectToCheckout}>Btn</button>
}
