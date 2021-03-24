import React from 'react'
import {Carousel, Popover, OverlayTrigger, Button} from 'react-bootstrap'

function Watches({product}) {
    return (
        <>
            <Carousel indicators={false}>
                {   product.map((pd, index)=>{
                    const originalString = pd.description
                    const strippedString = originalString.replace(/(<([^>]+>))/gi,"")
                    const popover = (
                        <Popover id="popover-basic">
                          <Popover.Title as="h3">Item Description</Popover.Title>
                          <Popover.Content>
                            {strippedString}
                          </Popover.Content>
                        </Popover>
                      )
                    return (
                        (pd.categories[0].name === 'Watches') &&
                        <Carousel.Item key={index}>
                        <img
                            src={pd.assets[0].url}
                            alt="First slide" 
                        />
                        <Carousel.Caption>
                            <h3>    
                                <span>{pd.name}</span>  
                            </h3>
                            <h2>
                                <span>{pd.price.formatted_with_code}</span>
                            </h2>
                            <p> 
                                <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                                    <Button variant="outline-primary" className="mx-5 mt-3">Click for Item Description</Button>
                                </OverlayTrigger>
                                <Button variant="outline-primary" className="mx-5 mt-3"> Add to Cart</Button>
                            </p>
                        </Carousel.Caption>   
                        </Carousel.Item>
                )})
            } 
            </Carousel>
        </>
    )
}

export default Watches
