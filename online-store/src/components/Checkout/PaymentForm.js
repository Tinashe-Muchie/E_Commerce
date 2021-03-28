import React, {useContext, useState} from 'react'
import {ListGroup, Form, Button, Alert} from 'react-bootstrap'
import {Context} from '../Context/Context'
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import {Redirect} from 'react-router-dom'

function PaymentForm({shippingData, handleBack, handleNext, timeout}) {

    const {checkoutToken, handleCaptureCheckout} = useContext(Context)
    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
    const [error, setError] = useState()
    const err = (error) ? true : false

    const CheckoutForm = () => {
        const stripe = useStripe()
        const elements = useElements()

        const handleSubmit = async (e) => {
            e.preventDefault()
            const {error, paymentMethod} = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement)
            })

            if (error) {
                setError(error)
            } else {
                const orderData = {
                    line_items: checkoutToken.live.line_items,
                    customer: {
                        firstname: shippingData.firstName,
                        lastname :shippingData.lastName,
                        email: shippingData.email,
                    },
                    shipping: {
                        name: 'Primary',
                        street: shippingData.addressLine1,
                        town_city: shippingData.city,
                        county_state: shippingData.shippingSubdivision,
                        postal_zip_code: shippingData.zip,
                        country: shippingData.shippingCountry,
                    },
                    fulfillment: {shipping_method: shippingData.shippingOption},
                    payment: {
                        gateway: 'stripe',
                        stripe: {
                            payment_method_id: paymentMethod.id
                        }
                    }
                }
                handleCaptureCheckout(checkoutToken.id, orderData)
                timeout()
                handleNext()
            }
        }
        return (
            <Form onSubmit={handleSubmit}>
                <div style={{fontFamily:'Papyrus', fontWeight: 'bold'}}>Card Details</div><hr />
                <CardElement />
                <hr />
                <div className="order-summary-product-subtitle mt-2">
                    <Button onClick={handleBack} variant="outline-secondary">Back</Button>
                    <Button
                        type="submit"
                        variant="secondary"
                        disabled={!stripe}
                    >
                        Pay {   (!checkoutToken)
                                ? <Redirect to="/cart" />
                                : checkoutToken.live.subtotal.formatted_with_symbol
                            }
                    </Button>
                </div>
            </Form>
        )
    }
    
    return (
        <div>
            <div className="order-summary mb-1">Order Summary</div>
            <ListGroup variant="flush">
                {   (!checkoutToken)
                ?   <Redirect to="/cart" />
                :
                    checkoutToken.live.line_items.map((product)=>(
                        <ListGroup.Item>
                            <div className="order-summary-product-title">{product.name}</div>
                            <div className="order-summary-product-subtitle">
                                <span>{`Quantity: ${product.quantity}`}</span>
                                <span>{product.line_total.formatted_with_symbol}</span>
                            </div>
                        </ListGroup.Item>
                    ))    
                }    
            </ListGroup>
            <ListGroup variant="flush">
                {
                        <ListGroup.Item>
                            <hr />
                            <div className="order-summary-product-title">Total </div>
                            <div className="order-summary-total-subtitle">
                                {   (!checkoutToken)
                                    ? <Redirect to="/cart" />
                                    : checkoutToken.live.subtotal.formatted_with_symbol
                                } 
                            </div>
                        </ListGroup.Item>
                }
            </ListGroup>
            <div className="order-summary my-1">Payment method</div>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                </ListGroup.Item>
            </ListGroup>
            <div className="mt-3" style={{display:'flex', justifyContent:'center'}}>
                {(err) && <Alert variant='dark' style={{color: '#C5C6C7', backgroundColor: '#950740'}}>
                    {error.message}
                </Alert>}   
            </div>
        </div>
    )
}

export default PaymentForm
