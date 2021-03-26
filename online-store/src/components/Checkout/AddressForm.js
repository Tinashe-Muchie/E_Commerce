import React from 'react'
import {Form, Col} from 'react-bootstrap'

function AddressForm() {
    return (
        <>
            <div className="address mb-2">
                Shipping  Address
            </div>
            <div className="address-wrapper">
                <Form>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>First Name*</Form.Label>
                            <Form.Control type="text" placeholder="Enter First Name" />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Last Name*</Form.Label>
                            <Form.Control type="text" placeholder="Enter Last Name" />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Address Line 1*</Form.Label>
                            <Form.Control type="text" placeholder="1234 Main Street" />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>E-mail*</Form.Label>
                            <Form.Control type="email" placeholder="mark@gmail.com" />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>City*</Form.Label>
                            <Form.Control type="text" placeholder="Enter City" />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Zip/Postal Code*</Form.Label>
                            <Form.Control type="number" placeholder="Enter Postal Code" />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Shipping Country</Form.Label>
                            <Form.Control as="select" defaultValue="Choose...">
                                <option>....</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Shipping Subdivision</Form.Label>
                            <Form.Control as="select" defaultValue="Choose...">
                                <option>...</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Shipping Options</Form.Label>
                            <Form.Control as="select" defaultValue="Choose...">
                                <option>...</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                </Form>
            </div>
        </>
    )
}

export default AddressForm
