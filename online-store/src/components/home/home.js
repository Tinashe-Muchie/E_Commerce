import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'

function Home() {
    return (
        <div className="wrapper">
            <div className="home-text my-1"> <span>Watches and Accessories that make you look the part, wherever you go!</span> 
            <div className="mt-1">
                <Link to="/watches">
                    <Button variant="outline-primary">Shop now</Button>
                </Link>
            </div>    
            </div>
            <div className="sliding-background"></div>
        </div>
    )
}

export default Home