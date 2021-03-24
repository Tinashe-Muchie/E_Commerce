import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import Watches from './components/watches/Watches'
import Accessories from './components/accessories/Accessories'
import Cart from './components/cart/Cart'
import Home from './components/home/home'
import {Helmet} from 'react-helmet'
import {commerce} from './lib/commerce'
import './App.css';

function App() {

const [product, setProduct] = useState([])

const fetchProducts = async()=>{
  const {data} = await commerce.products.list()
  setProduct(data)
}
useEffect(()=>{
  fetchProducts()
}, [])

  return (
    <Router>
      <div className="container">
        <Helmet>
          <style>{'body {background-color: #1A1A1D}'}</style>
        </Helmet>
        <nav className="header">
          <ul className="nav-links">
            <li>
              <Link to="/watches" className="link">Watches</Link>
            </li>
            <li>
              <Link to="/accessories" className="link">Accessories</Link>
            </li>
            <li>
              <Link to="/" className="link-home">Home</Link>
            </li>
            <li>
              <Link to="/cart" className="link"><i className="fa fas fa-shopping-cart"></i></Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/watches">
            <Watches product={product} />
          </Route>
          <Route path="/accessories">
            <Accessories product={product} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
          <Route path="cart">
            <Cart />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
