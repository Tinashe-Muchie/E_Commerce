import React, {useContext} from 'react'
import {Carousel, Popover, OverlayTrigger, Button} from 'react-bootstrap' 
import {Context} from '../Context/Context'

function Accessories() {
    
    const {product, commerce, setItems} = useContext(Context)

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
                    (pd.categories[0].name === 'Accessories') &&
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
                            <OverlayTrigger trigger="click" placement="left" overlay={popover}>
                                <Button variant="outline-primary" className="mx-5 mt-3">Click for Item Description</Button>
                            </OverlayTrigger>
                            <Button 
                                variant="outline-primary" 
                                className="mx-5 mt-3"
                                onClick={()=>{
                                    commerce.cart.add(pd.id, 1).then((response)=>setItems(response.cart))
                                }}
                            > 
                                Add to Cart
                            </Button>
                        </p>
                    </Carousel.Caption>   
                    </Carousel.Item>
            )})
        } 
        </Carousel>
    </> 
    )
}

export default Accessories
