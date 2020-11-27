import { CART_SAVE_SHIPPING_ADDRESS } from '../constants/cartConstants';
import { CART_REMOVE_ITEM } from '../constants/cartConstants';
import { CART_ADD_ITEM } from '../constants/cartConstants';
import { CART_SAVE_PAYMENT_METHOD } from '../constants/cartConstants';


export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return { // if we already have the item in the cart
          ...state, //not change other property
          cartItems: state.cartItems.map((x) => // update cart items that already exist
            x.product === existItem.product ? item : x // if equal item->new value, else x->old value in the cart
          ),
        };
      } else { //else same state, and if the item not exist in the cartItems in append with item
        return { ...state, cartItems: [...state.cartItems, item] }; // return state
      }
    case CART_REMOVE_ITEM:
        return {
            ...state, 
            cartItems: state.cartItems.filter((x) => x.product !== action.payload)
        };
    case CART_SAVE_SHIPPING_ADDRESS:
        return { ...state, shippingAddress: action.payload };
    case CART_SAVE_PAYMENT_METHOD:
        return { ...state, paymentMethod: action.payload };
    default:
      return state;
  }
};