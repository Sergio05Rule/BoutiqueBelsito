import React from 'react';

export default function CartScreen(props) {
  const productId = props.match.params.id; // retrive id from url
  const qty = props.location.search // retrive qty
    ? Number(props.location.search.split('=')[1]) // if exisit the cast->Number()
    : 1; //else 1
  return (
    <div>
      <h1>Cart Screen!!!!!</h1>
      <p>
        ADD TO CART : ProductID: {productId} Qty: {qty}
      </p>
    </div>
  );
}