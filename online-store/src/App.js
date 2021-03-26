import React from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import Watches from './components/watches/Watches'
import Accessories from './components/accessories/Accessories'
import Cart from './components/cart/Cart'
import Home from './components/home/home'
import Checkout from './components/Checkout/Checkout'
import {Helmet} from 'react-helmet'
import GlobalContext from './components/Context/Context'
import './App.css';

function App() {

  return (
    <GlobalContext>
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
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/watches">
            <Watches />
          </Route>
          <Route exact path="/accessories">
            <Accessories />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route exact path="/checkout">
            <Checkout />
          </Route>
        </Switch>
      </div>
    </Router>
    </GlobalContext>  
  );
}

export default App;
