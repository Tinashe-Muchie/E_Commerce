import React, {useContext} from 'react'
import {ListGroup} from 'react-bootstrap'
import {Context} from '../Context/Context'

function PaymentForm() {

    const {checkoutToken} = useContext(Context)
    
    return (
        <div>
            <div className="order-summary mb-1">Order Summary</div>
            <ListGroup variant="flush">
                {
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
                            <div className="order-summary-product-title">Total </div>
                            <div className="order-summary-total-subtitle">
                                {checkoutToken.live.subtotal.formatted_with_symbol} 
                            </div>
                        </ListGroup.Item>
                }
            </ListGroup>
        </div>
    )
}

export default PaymentForm
