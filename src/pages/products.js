import React from "react"
import { loadStripe } from "@stripe/stripe-js"
import { graphql, useStaticQuery } from "gatsby"

export default function Home() {
    // Rendering One Item

    const redirectToCheckout = async (event,pid) => {
        event.preventDefault()
        const stripe = await loadStripe("pk_test_51HlhtPAHq5PnEw7coOJtxDLj5kHUt9e6RAnryPcvIQb9xjYEglrOgDBlSVSNfuzAYQk820kbI5JwJE6FWcPwA9ZT00gPXP7OtP")
        const { error } = await stripe.redirectToCheckout({
            mode: "payment",
            lineItems: [{ price: pid, quantity: 1 }],
            successUrl: `http://localhost:8000/success/`,
            cancelUrl: `http://localhost:8000/error/`,
        })
        if (error) {
            console.warn("Error:", error)
        }
    }
    const data = useStaticQuery(graphql
        `
    query MyQuery {
        allStripePrice {
          edges {
            node {
              product {
                id
                description
                name
                images
              }
              id
            }
          }
        }
      }
      
    `)

    console.log(data);
    return (
        <div>
            <h1>My Products</h1>
            {
                data.allStripePrice.edges.map(({ node }) => {
                    return (
                        <div key={node.id}>
                            <p>{node.product.name}</p>
                            <p>{node.product.description}</p>
                            <img src={node.product.images[0]} />
                    <button onClick={(e)=>redirectToCheckout(e,node.id)}>Buy {node.product.name}</button>
                        </div>
                    )
                })
            }

        </div>
    )
}
