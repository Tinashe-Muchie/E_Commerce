import React, {useState, createContext, useEffect} from 'react'
import {commerce} from '../../lib/commerce'

export const Context = createContext()

function GlobalContext({children}) {

    const [product, setProduct] = useState([])
    const [Items, setItems] = useState([])
    const [checkoutToken, setCheckoutToken] = useState(null)

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
                
            }
        }
        generateToken()
    },[Items])

    const value = {
        setItems,
        Items, 
        commerce,
        product,
        checkoutToken,
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export default GlobalContext
