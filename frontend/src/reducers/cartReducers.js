import { CART_ADD_ITEM } from '../constants/cartConstants';

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
    default:
      return state;
  }
};