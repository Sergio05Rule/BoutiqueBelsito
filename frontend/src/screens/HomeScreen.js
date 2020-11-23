import React, { useEffect, useState } from 'react';
import Product from '../components/Product';
import axios from 'axios'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function HomeScreen() {
  const [products, setProducts] = useState([]); //React hook to manage state of react component
  const [loading, setLoading] = useState(false); //React hook for loading
  const [error, setError] = useState(false); //React hook for error

  // React use-effect function, run once the render of the components is ended
  // One the page is loaded, fetch (data) the products with a ajax request
  useEffect(() =>{
    const fetchData = async()=>{
      try{
        setLoading(true);
        const {data} = await axios.get('/api/products'); // Backend Array loaded to data
        setLoading(false);
        setProducts(data);
      }
      catch(err){
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData(); //call the function
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