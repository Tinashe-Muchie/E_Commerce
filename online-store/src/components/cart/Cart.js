import React, {useContext} from 'react'
import {Container, Row, Col, Button, Spinner} from 'react-bootstrap'
import {Context} from '../Context/Context'
import {Link} from 'react-router-dom'

function Cart() {

    const {Items, setItems, commerce} = useContext(Context)

    console.log(Items)

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
                {Items.line_items.map((item,index)=>{
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
                                                    .then(response=>setItems(response.cart))
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
                                                    .then(response=>setItems(response.cart))
                                                }}
                                            >
                                                <i className="fa fa-plus" />
                                            </Button>
                                            <Button 
                                                variant="primary" 
                                                className="ml-4"
                                                onClick={()=>{
                                                    commerce.cart.remove(item.id).then(response=>setItems(response.cart))
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
                        Subtotal:   <span style={{color: '#C3073F', fontWeight: 'bold'}}> 
                                        {Items.subtotal.formatted_with_code} 
                                    </span>
                    </div>
                    <div>
                        <Button 
                            variant="outline-primary" 
                            className="mx-2"
                            onClick={()=>{
                                commerce.cart.empty().then((response)=>setItems(response.cart))
                            }}
                        >
                            EmptyCart
                        </Button>
                        <Link to="/checkout">
                            <Button variant="primary" type="button">Checkout</Button>
                        </Link>   
                    </div>
                </div>
            </div>
            </>
        )
    }
    if (!Items.line_items) return  <div className="loading-position">
                                        <Spinner animation="border" style={{color: '#C5C6C7'}} />
                                    </div> 
    return (
        <>
        {(Items.line_items.length === 0) ?<EmptyCart /> :<PopulatedCart />}
        </>
    )
}

export default Cart