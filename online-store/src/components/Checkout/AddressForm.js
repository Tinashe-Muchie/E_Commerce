import React, {useEffect, useContext, useState} from 'react'
import {Form, Col, Button} from 'react-bootstrap'
import {useForm} from 'react-hook-form'
import {Context} from '../Context/Context'
import {Link} from 'react-router-dom'

function AddressForm({next}) {

    const {register, handleSubmit, errors} = useForm()
    const {commerce, checkoutToken} = useContext(Context)
    const [shippingCountries, setShippingCountries] = useState([])
    const [shippingCountry, setShippingCountry] = useState('')
    const [shippingSubdivisions, setShippingSubdivisions] = useState([])
    const [shippingSubdivision, setShippingSubdivision] = useState('') 
    const [shippingOptions, setShippingOptions] = useState([])
    const [shippingOption, setShippingOption] = useState('')

    const countries = Object.entries(shippingCountries).map(([code, name])=>({ id:code, name:name }))
    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name])=>({ id:code, name:name }))
    const options = shippingOptions.map(({id, description, price})=>({
        id: id,
        name:`${description} - ${price.formatted_with_symbol}`,
    }))

    useEffect(()=>{
        const fetchShippingCountries = async (checkoutTokenID) => {
            const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenID)
            setShippingCountries(countries)
            setShippingCountry(Object.keys(countries)[0])           
        }

        (checkoutToken) && fetchShippingCountries(checkoutToken.id)
    },[checkoutToken, commerce])

    
    useEffect(()=>{
        const fetchShippingSubdivisions = async (countryCode) => {
            const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode)
            setShippingSubdivisions(subdivisions)
            setShippingSubdivision(Object.keys(subdivisions)[0])
        }

        (shippingCountry) && fetchShippingSubdivisions(shippingCountry)
    },[shippingCountry, commerce])

    useEffect(()=>{
        const fetchShippingOptions = async (checkoutTokenID, country, region=null) => {
            const response = await commerce.checkout.getShippingOptions(checkoutTokenID, {country, region})
            setShippingOptions(response)
            setShippingOption(response[0].id)
        }

        (shippingSubdivision) && fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision)
    }, [commerce, checkoutToken, shippingCountry, shippingSubdivision])

    console.log(options)
    console.log(shippingOption)

    return (
        <>
            <div className="address mb-2">
                Shipping  Address
            </div>
            <div className="address-wrapper">
                <Form onSubmit={handleSubmit((data)=>(next(data)))}>
                    <Form.Row>
                        <Form.Group as={Col} xs={12} md={6}>
                            <label>First Name*</label>
                            <input name="firstName" ref={register({required: true})} placeholder="Enter First Name" />
                            {errors.firstName && (<p style={{color: '#950740', fontFamily: 'Papyrus'}}>
                                                    This field is required
                                                </p>)}
                        </Form.Group>
                        <Form.Group as={Col} xs={12} md={6}>
                            <label>Last Name*</label>
                            <input name="lastName" ref={register({required: true})} placeholder="Enter Last Name" />
                            {errors.lastName && (<p style={{color: '#950740', fontFamily: 'Papyrus'}}>
                                                    This field is required
                                                </p>)}
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} xs={12} md={6}>
                            <label>Address Line 1*</label>
                            <input name="addressLine1" ref={register({required: true})} placeholder="1234 Main Street" />
                            {errors.addressLine1 && (<p style={{color: '#950740', fontFamily: 'Papyrus'}}>
                                                        This field is required
                                                    </p>)}
                        </Form.Group>
                        <Form.Group as={Col} xs={12} md={6}>
                            <label>E-mail*</label>
                            <input name="email" ref={register({required: true})} placeholder="mark@gmail.com" />
                            {errors.email && (<p style={{color: '#950740', fontFamily: 'Papyrus'}}>
                                                This field is required
                                            </p>)}
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} xs={12} md={6}>
                            <label>City*</label>
                            <input name="city" ref={register({required: true})} placeholder="Enter City" />
                            {errors.city && (<p style={{color: '#950740', fontFamily: 'Papyrus'}}>
                                                This field is required
                                            </p>)}
                        </Form.Group>
                        <Form.Group as={Col} xs={12} md={6}>
                            <label>Zip/Postal Code*</label>
                            <input name="zip" ref={register({required: true})} placeholder="Enter Postal Code" />
                            {errors.zip && (<p style={{color: '#950740', fontFamily: 'Papyrus'}}>
                                                This field is required
                                            </p>)}
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} xs={12} md={6}>
                            <label>Shipping Country</label>
                            <select 
                                name="shippingCountry" 
                                ref={register({required: true})} 
                                value={shippingCountry}
                                onChange={(e)=>(setShippingCountry(e.target.value))}
                            >
                                {countries.map((country)=>(
                                    <option key={country.id} value={country.id}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </Form.Group>
                        <Form.Group as={Col} xs={12} md={6}>
                            <label>Shipping Subdivision</label>
                            <select 
                                name="shippingSub" 
                                ref={register({required: true})} 
                                value={shippingSubdivision}
                                onChange={(e)=>(setShippingSubdivision(e.target.value))}
                            >
                                {subdivisions.map((subdivision)=>(
                                    <option key={subdivision.id} value={subdivision.id}>
                                        {subdivision.name}
                                    </option>
                                ))}
                            </select>
                        </Form.Group> 
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} xs={12} md={12}>
                            <label>Shipping Options</label>
                            <select 
                                name="shippingOptions" 
                                ref={register({required: true})}
                                value={shippingOption}
                                onChange={(e)=>(setShippingOption(e.target.value))}
                            >
                                {options.map((option)=>(
                                    <option key={option.id} value={option.id}>
                                        {option.name}
                                    </option>
                                ))}   
                            </select>
                        </Form.Group>
                    </Form.Row>
                    <div>
                        <Link to="/Cart">
                            <Button 
                                type="button"
                                variant="outline-primary"
                            >
                                Back to Cart
                            </Button>
                        </Link>
                        <Button
                            type="submit"
                            variant="primary"
                        >
                            Next
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default AddressForm
