import React from 'react';
import Rating from './Rating';

export default function Product(propos) {
    const {product} = propos;
    return(
        <div key={product._id} className="card">
        <a href={ /* ` -> alt + 9 backtrick literal! */ 
            `product/${product._id}` /* Setting url with the product ID */
            }>
            <img className="medium" src={product.image} alt={product.name}/>
        </a>
        <div className="card-body">
            <a href={ `product/${product._id}`}>
                <h2> {product.name} </h2>
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