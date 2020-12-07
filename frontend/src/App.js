import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SearchBox from './components/appbar/SearchBox';
import SearchScreen from './screens/SearchScreen';
import { listProductCategories } from './actions/productActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import AppBar from './components/appbar/appbar';
import './components/appbar/appbar.css';
import './components/appbar/drawerBasic/drawerBasic.css';
import './components/appbar/SearchBox.css';


function App() {

    const cart = useSelector((state) => state.cart);
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
    const {cartItems} = cart;
    const userSignin = useSelector((state) => state.userSignin)
    const {userInfo} = userSignin;
    const dispatch = useDispatch()
    const signoutHandler = () =>{
        dispatch(signout());

    }

    const productCategoryList = useSelector((state) => state.productCategoryList);
    const {
        loading: loadingCategories,
        error: errorCategories,
        categories,
    } = productCategoryList;
    useEffect(() => {
        dispatch(listProductCategories());
  }, [dispatch]);
  return (
        <BrowserRouter>
            <AppBar></AppBar>
            <main>
                <Route path="/cart/:id?" component={CartScreen}></Route>
                <Route path="/product/:id" component={ProductScreen} exact></Route>
                <Route path="/product/:id/edit" component={ProductEditScreen} exact></Route>
                <Route path="/signin" component={SigninScreen}></Route>
                <Route path="/register" component={RegisterScreen}></Route>
                <Route path="/forgotpassword" component={ForgotPasswordScreen}></Route>
                <Route path="/shipping" component={ShippingAddressScreen}></Route>
                <Route path="/payment" component={PaymentMethodScreen}></Route>
                <Route path="/placeorder" component={PlaceOrderScreen}></Route>
                <Route path="/order/:id" component={OrderScreen}></Route>
                <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
                <Route path="/search/name/:name?" component={SearchScreen} exact></Route>
                <Route path="/search/category/:category" component={SearchScreen} exact></Route>
                <Route path="/search/category/:category/name/:name" component={SearchScreen} exact></Route>
                <Route path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order" component={SearchScreen} exact ></Route>
                <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
                <AdminRoute path="/productlist" component={ProductListScreen}></AdminRoute>
                <AdminRoute path="/orderlist" component={OrderListScreen}></AdminRoute>
                <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
                <AdminRoute path="/user/:id/edit" component={UserEditScreen}></AdminRoute>
                <Route path="/" component={HomeScreen} exact></Route>
            </main>
            <footer className="contacts">
                © 2021 Boutique Belsito Tutti i diritti riservati 
                <br></br>
                Via Dell'urbanistica 6, 76011 Bisceglie (BAT), Puglia  P.IVA 07492280727
                <br></br>
                <a className="personalTag" href="https://www.instagram.com/sergio05rule/">Developed by @sergio05rule</a>
            </footer>
            </BrowserRouter>
        );
    }

export default App;