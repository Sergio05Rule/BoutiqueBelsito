import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductScreen from './screens/ProductScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';

function App() {

    const cart = useSelector((state) => state.cart);
    const {cartItems} = cart;
    const userSignin = useSelector((state) => state.userSignin)
    const {userInfo} = userSignin;
    const dispatch = useDispatch()
    const signoutHandler = () =>{
        dispatch(signout());

    }


    return (
        <BrowserRouter>
        <div className="grid-container">
                <header className="row">

                    <div>
                        <Link className="brand" to="/">Boutique Belsito</Link>
                    </div>
                    <div>
                        <Link to="/cart" >
                            <i class="fa fa-shopping-cart" style={{'font-size' : '3rem'}}></i>
                            {cartItems.length > 0 && (
                                <span className="badge">{cartItems.length}</span>
                        )}
                        </Link>
                        {userInfo ? (
                                <div className="dropdown">
                                    <Link to="#" >
                                        {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                                     </Link>
                                     <ul className="dropdown-content">
                                         <Link to="#signout" onClick={signoutHandler} >
                                             SignOut
                                         </Link>
                                     </ul>
                                </div>
                            ) : (
                                <Link to="/signin">Sign In</Link>
                            )}
                    </div>
                </header>
                <main>
                    <Route path="/cart/:id?" component={CartScreen}></Route>
                    <Route path="/product/:id" component={ProductScreen}></Route>
                    <Route path="/signin" component={SigninScreen}></Route>
                    <Route path="/register" component={RegisterScreen}></Route>
                    <Route path="/shipping" component={ShippingAddressScreen}></Route>
                    <Route path="/payment" component={PaymentMethodScreen}></Route>
                    <Route path="/placeorder" component={PlaceOrderScreen}></Route>
                    <Route path="/order/:id" component={OrderScreen}></Route>
                    <Route path="/" component={HomeScreen} exact></Route>
                </main>
                <footer className="contacts">
                    © 2021 Boutique Belsito Tutti i diritti riservati 
                    <br></br>
                    Via Dell'urbanistica 6, 76011 Bisceglie (BAT), Puglia  P.IVA XXXXXXX
                    <br></br>
                    <a className="personalTag" href="https://www.instagram.com/sergio05rule/">Developed by @sergio05rule</a>
                </footer>
            </div> 
            </BrowserRouter>
        );
    }

export default App;