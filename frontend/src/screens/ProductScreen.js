import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createReview, detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';
import { listOrderMine } from '../actions/orderActions';


export default function ProductScreen(props) {
  // retrive order list to check if the client has done the payment and can review the product
  // questa operazione resetta lo state di redux
  let isProductBuyed = false;
  const orderMineList = useSelector((state) => state.orderMineList);
  const { l, e, orders } = orderMineList;

  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(0);
  const [size, setSize] = useState('');
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (successReviewCreate) {
      window.alert('Review Submitted Successfully');
      setRating('');
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(listOrderMine());// heree     
    dispatch(detailsProduct(productId));
  }, [dispatch, productId, successReviewCreate]);
  
  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}?size=${size}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();

    if (comment && rating) {
        // check if the user have acquired, paid and get deliverd the product
     for ( let i = 0 ; i <orders.length;i++)
     {
       if (orders[i].isPaid === true && orders[i].isDelivered === true)
       {
         for (let j = 0; j< orders[i].orderItems.length; j++)
       {
         if( orders[i].orderItems[j].product === productId)
         {
           isProductBuyed = true;
         }
       }
       }
       
     }
      if(isProductBuyed)
      {
        dispatch(
          createReview(productId, { rating, comment, name: userInfo.name })
        );
      }
      else
      {
        alert('You must have acquire the product before submiting a review');
      }
      
    } else {
      alert('Please enter comment and rating');
    }
  };
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/">Back to result</Link>
          <div className="row top">
            <div className="col-2">
              <img
                className="large"
                src={product.image}
                alt={product.name}
              ></img>
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  ></Rating>
                </li>
                <li>Shop Code : {product.shopCode}</li>
                <li>Pirce : {product.price}€</li>
                <li>
                  Description:
                  <p>{product.description}</p>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <div className="row">
                      <div>Price</div>
                      <div className="price">{product.price}€</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status</div>
                      <div>
                        {product.sizeStockCount.map((sizeCount) => (
                          (sizeCount.S > 0 || sizeCount.M > 0 || sizeCount.L > 0 || sizeCount.XL > 0 || sizeCount.XXL > 0 || sizeCount.XXXL > 0) ? (
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="danger">Unavailable</span>
                        )))}
                      </div>
                    </div>
                  </li>


                  {product.sizeStockCount.map((sizeCount) => (
                  (sizeCount.S > 0 || sizeCount.M > 0 || sizeCount.L > 0 || sizeCount.XL > 0 || sizeCount.XXL > 0 ||sizeCount.XXXL > 0)  && (
                    <>
                      <li>          
                      <div className="row">
                          <label>Size</label>
                          <select title="Scegli una opzione"
                            onChange={(e) => setSize(e.target.value)}
                            defaultValue="Default"
                            >
                            <option value="Default" disabled>Select your option</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="XXL">XXL</option>
                            <option value="XXL">XXXL</option>
                          </select>
                      </div>
                      </li>

                      {size === "S" && (
                        <>
                        <li>
                        <div className="row">
                          <div>Qty</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              <option>
                                    0
                                  </option>
                              {[...Array(sizeCount.S).keys()].map(
                                (x) => (
                                  
                                  <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                               
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      </>
                      )}

                      {size === "M" && (
                        <>
                        <li>
                        <div className="row">
                          <div>Qty</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              <option>
                                    0
                                  </option>
                              {[...Array(sizeCount.M).keys()].map(
                                (x) => (
                                  
                                  <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                               
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      </>
                      )}
                      {size === "L" && (
                        <>
                        <li>
                        <div className="row">
                          <div>Qty</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              <option>
                                    0
                                  </option>
                              {[...Array(sizeCount.L).keys()].map(
                                (x) => (
                                  
                                  <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                               
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      </>
                      )}
                      {size === "XL" && (
                        <>
                        <li>
                        <div className="row">
                          <div>Qty</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              <option>
                                    0
                                  </option>
                              {[...Array(sizeCount.XL).keys()].map(
                                (x) => (
                                  
                                  <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                               
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      </>
                      )}
                      {size === "XXL" && (
                        <>
                        <li>
                        <div className="row">
                          <div>Qty</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              <option>
                                    0
                                  </option>
                              {[...Array(sizeCount.XXL).keys()].map(
                                (x) => (
                                  
                                  <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                               
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      </>
                      )}
                      {size === "XXXL" && (
                        <>
                        <li>
                        <div className="row">
                          <div>Qty</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              <option>
                                    0
                                  </option>
                              {[...Array(sizeCount.XXXL).keys()].map(
                                (x) => (
                                  
                                  <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                               
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      </>
                      )}
                      {/*
                      product.sizeStockCount.map((size) => (
                      <li>
                        <div className="row">
                          <div></div>
                          <div>
                            <select
                              value={sizes}
                              onChange={(e) => setSize(e.target.value)}
                            >
                              {[...Array(size.S).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      ))*/}
                      {size !== "" && qty > 0 && (
                        <>
                      <li>
                        <button
                          onClick={addToCartHandler}
                          className="primary block"
                        >
                          Add to Cart
                        </button>
                      </li>
                      </>)}

                    </>
                  )))}
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h2 id="reviews">Reviews</h2>
            {product.reviews.length === 0 && (
              <MessageBox>There is no review</MessageBox>
            )}
            <ul>
              {product.reviews.map((review) => (
                <li key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating rating={review.rating} caption=" "></Rating>
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </li>
              ))}
              <li>
                  { userInfo ? (
                  <form className="form" onSubmit={submitHandler}>
                    <div>
                      <h2>Write a customer review</h2>
                    </div>
                    <div>
                      <label htmlFor="rating">Rating</label>
                      <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1- Poor</option>
                        <option value="2">2- Fair</option>
                        <option value="3">3- Good</option>
                        <option value="4">4- Very good</option>
                        <option value="5">5- Excelent</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="comment">Comment</label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label />
                      <button className="primary" type="submit">
                        Submit
                      </button>
                    </div>
                    <div>
                      {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && (
                        <MessageBox variant="danger">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                    </div>
                  </form>
                ) : (
                  <MessageBox>
                    Please <Link to="/signin">Sign In</Link> to write a review
                  </MessageBox>
                )
                }
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}