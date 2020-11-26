import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';

export default function CartScreen(props) {
  const productId = props.match.params.id; // retrive id from url
  const qty = props.location.search // retrive qty
    ? Number(props.location.search.split('=')[1]) // if exisit the cast->Number()
    : 1; //else 1

    // useEffect input (function, dependecy list)
    const dispatch = useDispatch();
    useEffect(()=>{
        if(productId){
            dispatch(addToCart(productId,qty));
        }

    },[dispatch, productId, qty]);
  return (
    <div>
      <h1>Cart Screen!!!!!</h1>
      <p>
        ADD TO CART : ProductID: {productId} Qty: {qty}
      </p>
    </div>
  );
}