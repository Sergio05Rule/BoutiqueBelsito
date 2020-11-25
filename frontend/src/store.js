import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { productDetailsReducer, productListReducer } from './reducers/productReducers';

const initialState = {}; //Initial State of the Store

// Reducer: function that given a state, action return a new state
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create the store given a reducer and a state
const store = createStore(
    reducer, 
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;