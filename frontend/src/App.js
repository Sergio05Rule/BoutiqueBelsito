import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen.jsx';
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
import SearchScreen from './screens/SearchScreen';
import { listProductCategories } from './actions/productActions';
import AppBar from './components/appbar/appbar';
import Footer from './components/footer/footer';
import './components/appbar/appbar.css';
import './components/appbar/drawerBasic/drawerBasic.css';
import './components/appbar/SearchBox.css';
import './App.css'
import {Row,Col} from "react-bootstrap";
import BiographyScreen from './screens/BiographyScreen';
import DetailsScreen from './screens/DetailsScreen';
import PaymentInfoScreen from './screens/PaymentInfoScreen';
import ShippmentInfoScreen from './screens/ShippmentInfoScreen';
import PrivacyScreen from './screens/PrivacyScreen';
import CookieScreen from './screens/CookieScreen';



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
      <React.Fragment>
        <BrowserRouter>
            <AppBar></AppBar>
            <body id="appJsBody">
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
                <Route path="/BiographyScreen" component={BiographyScreen}></Route>
                <Route path="/DetailsScreen" component={DetailsScreen}></Route>
                <Route path="/PaymentInfoScreen" component={PaymentInfoScreen}></Route>
                <Route path="/ShippmentInfoScreen" component={ShippmentInfoScreen}></Route>
                <Route path="/PrivacyScreen" component={PrivacyScreen}></Route>
                <Route path="/CookieScreen" component={CookieScreen}></Route>
                <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
                <AdminRoute path="/productlist" component={ProductListScreen}></AdminRoute>
                <AdminRoute path="/orderlist" component={OrderListScreen}></AdminRoute>
                <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
                <AdminRoute path="/user/:id/edit" component={UserEditScreen}></AdminRoute>
                <Route path="/" component={HomeScreen} exact></Route>
            </body>
            <Footer></Footer>
        </BrowserRouter>
        </React.Fragment>
        );
    }

export default App;