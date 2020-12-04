import React, { useEffect, useState } from 'react';
import Product from '../components/Product';
import axios from 'axios'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import CookieConsent from "react-cookie-consent";
import { Link } from 'react-router-dom';

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
      <CookieConsent
       buttonText = "Accetto"
       buttonStyle={{ color: "#203040"}}
       expires={150}
       debug={true}
       style={{ background: "#203040"}}
       >
         Questo sito utilizza cookie per migliorare la tua esperienza di utilizzo. Per saperne di più leggi la nostra informativa. <Link to="/">Cookie Policy</Link>
       </CookieConsent>
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