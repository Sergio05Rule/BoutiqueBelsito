import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';
import './css/CartScreen.css';

export default function CartScreen(props) {
  const productId = props.match.params.id; // retrive id from url
  const qty = props.location.search // retrive qty
    ? Number(props.location.search.split('=')[1][0]) // if exisit the cast->Number()
    : 1; //else 1
    
    const size = props.location.search 
        ? props.location.search.split('=')[2] // if exisit the cast->Number()
        : ''; 

    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;
    // useEffect input (function, dependecy list)
    const dispatch = useDispatch();
    useEffect(()=>{
        if(productId){
            dispatch(addToCart(productId,qty,size));
        }

    },[dispatch, productId, qty,size]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }

    const checkoutHandler = () => {
        props.history.push('/signin?redirect=shipping');
      };
    
    return (
    <div className="container">
        <div className="">
            <div className="">
            <h1>Carrello: </h1>
            {cartItems.length === 0 ? (
                <MessageBox>
                Il carello è vuoto.<Link to="/">Go Shopping!</Link>
                </MessageBox>
            ) : (
                <ul>
                {cartItems.map((item) => (
                    <li key={item.product}>
                    <div className="">
                        <div>
                        <img
                            src={item.image}
                            alt={item.name}
                            className=""
                        ></img>
                        </div>
                        <div className="">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </div>


                        <div>Taglia:{item.size}</div>

                        <div>
                        {item.size === 'S' &&(
                        <select
                            value={item.qty}
                            onChange={(e) =>
                            dispatch(
                                addToCart(item.product, Number(e.target.value), item.size )
                            )
                            }
                        >
                            {[...Array(item.sizeStockCount[0].S).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                                {x + 1}
                            </option>
                            ))}
                        </select>
                        )}

                        { item.size === 'M' &&(
                        <select
                            value={item.qty}
                            onChange={(e) =>
                            dispatch(
                                addToCart(item.product, Number(e.target.value), item.size )
                            )
                            }
                        >
                            {[...Array(item.sizeStockCount[0].M).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                                {x + 1}
                            </option>
                            ))}
                        </select>
                        )}

                        { item.size === 'L' &&(
                        <select
                            value={item.qty}
                            onChange={(e) =>
                            dispatch(
                                addToCart(item.product, Number(e.target.value), item.size )
                            )
                            }
                        >
                            {[...Array(item.sizeStockCount[0].L).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                                {x + 1}
                            </option>
                            ))}
                        </select>
                        )}

                        { item.size === 'XL' &&(
                        <select
                            value={item.qty}
                            onChange={(e) =>
                            dispatch(
                                addToCart(item.product, Number(e.target.value), item.size )
                            )
                            }
                        >
                            {[...Array(item.sizeStockCount[0].XL).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                                {x + 1}
                            </option>
                            ))}
                        </select>
                        )}  

                        { item.size === 'XXL' &&(
                        <select
                            value={item.qty}
                            onChange={(e) =>
                            dispatch(
                                addToCart(item.product, Number(e.target.value), item.size )
                            )
                            }
                        >
                            {[...Array(item.sizeStockCount[0].XXL).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                                {x + 1}
                            </option>
                            ))}
                        </select>
                        )}   

                        { item.size === 'XXXL' &&(
                        <select
                            value={item.qty}
                            onChange={(e) =>
                            dispatch(
                                addToCart(item.product, Number(e.target.value), item.size )
                            )
                            }
                        >
                            {[...Array(item.sizeStockCount[0].XXXL).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                                {x + 1}
                            </option>
                            ))}
                        </select>
                        )}     
                        </div>

                        <div>{item.price}€</div>
                        <div>
                        <button
                            type="button"
                            onClick={() => removeFromCartHandler(item.product)}
                        >
                            Rimuovi
                        </button>
                        </div>
                    </div>
                    </li>
                ))}
                </ul>
            )}
            </div>
            <div className="">
            <div className="">
                <ul>
                <li>
                    <h2>
                    Subtotale ({cartItems.reduce((a, c) => a + c.qty, 0)} oggetto/i) : 
                    {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}€
                    </h2>
                </li>
                <li>
                    <button
                    type="button"
                    onClick={checkoutHandler}
                    className=""
                    disabled={cartItems.length === 0}
                    >
                    Procedi al Checkout
                    </button>
                </li>
                </ul>
            </div>
            </div>
        </div>
    </div>
    );
}