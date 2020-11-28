import React from 'react';
import Rating from './Rating';
import {Link} from 'react-router-dom'

export default function Product(props) {
  const { product } = props;
  return (
    <div key={product._id} className="card">
      <Link to={/* alt+9backtrick literal!, setting url with product._id*/ `/product/${product._id}`}>
        <img className="medium" src={product.image} alt={product.name} />
      </Link>
      <div className="card-body">
        <a href={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </a>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        <div className="price">{product.price}€</div>
      </div>
    </div>
  );
}