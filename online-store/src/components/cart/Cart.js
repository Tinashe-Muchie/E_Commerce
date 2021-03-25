import React, {useState, useEffect} from 'react'
import {Container, Row, Col, Button} from 'react-bootstrap'

function Cart({commerce}) {

    const [Items, setItems] = useState([])

    useEffect(()=>{
        commerce.cart.contents().then((items)=>setItems(items))
    },[commerce.cart])
    console.log(Items)

    const isEmpty = (Items.length === 0) ? true  :false 

    const EmptyCart = ()=> {
        return (
            <div className="empty-cart">
                Your Cart is empty, add some items!
            </div>
        )
    }
    const PopulatedCart = ()=> {
        return (
            <>
            <Container>
                <Row className="justify-content-md-center">
                { Items.map((item,index)=>{
                    let quantity = 1
                    return (
                        <Col xs={6} md={3} className="mt-2">
                            <Container>
                                <Row>
                                    <Col>
                                        <img
                                        src={item.media.source}
                                        alt="" 
                                        className="mb-1"
                                        style={{height: '30vh', width: '15vw', border: 'thin solid #C5C6C7', borderRadius: '5px'}}
                                        />
                                        <div style={{color: '#C5C6C7', fontSize:'small', fontFamily: 'Papyrus'}}>
                                            {item.product_name}
                                        </div>
                                        <div style={{color: '#C3073F', fontSize:'x-small'}} className="mt-1">
                                            {item.price.formatted_with_code}
                                        </div>
                                        <div className="mt-1">
                                            <Button 
                                                variant="outline-primary" 
                                                onClick={()=>{
                                                    quantity--
                                                    commerce.cart.update(item.id, {quantity: quantity})
                                                    .then(response=>console.log(response))
                                                }}
                                            >
                                                    <i className="fa fa-minus" />
                                            </Button>
                                            <span className="count mx-2">
                                                {item.quantity}
                                            </span>
                                            <Button 
                                                variant="outline-primary"
                                                onClick={()=>{
                                                    quantity++
                                                    commerce.cart.update(item.id, {quantity: quantity})
                                                    .then(response=>console.log(response))
                                                }}
                                            >
                                                <i className="fa fa-plus" />
                                            </Button>
                                            <Button 
                                                variant="primary" 
                                                className="ml-4"
                                                onClick={()=>{
                                                    commerce.cart.remove(item.id)
                                                }}
                                            >
                                                <i className="fa fa-trash" /> item
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    )   
                }) 
                }
                </Row>             
            </Container>
            <div className="mt-5">
                <div className="cart-checkout-wrapper">
                    <div className="subtotal"> 
                        Subtotal:
                    </div>
                    <div>
                        <Button 
                            variant="primary" 
                            className="mx-2"
                            onClick={()=>{
                                commerce.cart.empty()
                            }}
                        >
                            EmptyCart
                        </Button>
                        <Button variant="primary">Checkout</Button>
                    </div>
                </div>
            </div>
            </>
        )
    }

    return (
        <>
        {
                (isEmpty)
            ?   <EmptyCart />
            :   <PopulatedCart />
        }
        </>
    )
}

export default Cart