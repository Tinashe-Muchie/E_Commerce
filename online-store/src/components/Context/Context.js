import React, {useState, createContext, useEffect} from 'react'
import {commerce} from '../lib/commerce'

export const Context = createContext()

function GlobalContext({children}) {

    const [product, setProduct] = useState([])
    const [Items, setItems] = useState([])

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

    const value = {
        setItems,
        Items, 
        commerce,
        product,
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export default GlobalContext
