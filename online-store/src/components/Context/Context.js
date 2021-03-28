import React, {useState, createContext, useEffect} from 'react'
import {commerce} from '../../lib/commerce'
import {Redirect} from 'react-router-dom'

export const Context = createContext()

function GlobalContext({children}) {

    const [product, setProduct] = useState([])
    const [Items, setItems] = useState([])
    const [checkoutToken, setCheckoutToken] = useState(null)
    const [order, setOrder] = useState({})
    const [error, setError] = useState('')

    const fetchProducts = async()=>{
        const {data} = await commerce.products.list()
        setProduct(data)
      }
    
    useEffect(()=>{
        fetchProducts()
    }, [])
    
    useEffect(()=>{
        commerce.cart.retrieve().then((cart)=>setItems(cart))
    },[])

    useEffect(()=>{
        const generateToken = async ()=>{
            try {
                await commerce.checkout.generateToken(Items.id, {type: 'cart'})
                        .then((checkout)=>setCheckoutToken(checkout))
            } catch (error) {
                <Redirect to="/cart" />
            }
        }
        generateToken()
    },[Items])

    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh()
        setItems(newCart)
    }

    const handleCaptureCheckout = async (checkoutTokenID, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenID, newOrder)

            setOrder(incomingOrder)
            refreshCart()
        } catch (error) {
            setError(error.data.error.message)
        }
    }

    const value = {
        setItems,
        Items, 
        commerce,
        product,
        checkoutToken,
        order,
        handleCaptureCheckout,
        error,
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export default GlobalContext
