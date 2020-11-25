import React, { useEffect } from 'react';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

export default function HomeScreen() {
  const dispatch = useDispatch();
  // function with in input a state
  const productList = useSelector( (state) => state.productList);
  const {loading, error, products} = productList

  // React use-effect function, run once the render of the components is ended
  // One the page is loaded, fetch (data) the products with a ajax request
  useEffect(() =>{
    dispatch(listProducts()); // dispach an action "listProducts"
  }, []);

  //Render section of the components
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {products.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
        </div>
      )}
    </div>
  );
}