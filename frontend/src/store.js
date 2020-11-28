import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { orderCreateReducer } from './reducers/orderReducers';
import { productDetailsReducer, productListReducer } from './reducers/productReducers';
import { 
    userRegisterReducer, 
    userSigninReducer,
} from './reducers/userReducers';

const initialState = {
    userSignin: {
        userInfo : localStorage.getItem('userInfo') //if exist
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,
    },
    cart:{
        cartItems: localStorage.getItem('cartItems') // if exist
        ? JSON.parse(localStorage.getItem('cartItems')) //then
        : [], //else
    shippingAddress: localStorage.getItem('shippingAddress')
        ? JSON.parse(localStorage.getItem('shippingAddress'))
        : {},
        paymentMethod: 'PayPal', // default value
    }
}; //Initial State of the Store

// Reducer: function that given a state, action return a new state
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart : cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create the store given a reducer and a state
const store = createStore(
    reducer, 
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;