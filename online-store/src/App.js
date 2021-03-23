import React from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import Watches from './components/watches/Watches'
import Accessories from './components/accessories/Accessories'
import Cart from './components/cart/Cart'
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/watches">Watches</Link>
            </li>
            <li>
              <Link to="/accessories">Accessories</Link>
            </li>
            <li>
              <Link to="/cart"></Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/watches">
            <Watches />
          </Route>
          <Route path="accessories">
            <Accessories />
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
