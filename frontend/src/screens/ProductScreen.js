import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createReview, detailsProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import { PRODUCT_REVIEW_CREATE_RESET } from "../constants/productConstants";
import { listOrderMine } from "../actions/orderActions";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { Row, Col, Dropdown, Container, Image } from "react-bootstrap/";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import "../index.css";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SaveIcon from '@material-ui/icons/Save';

const CssTextField = withStyles({
  root: {
    "& .MuiInputBase-root": {
      color: "black",
    },

    "& label.Mui-focused": {
      color: "gold",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "gold",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "gold",
      },
      "&:hover fieldset": {
        borderColor: "gold",
      },
      "&.Mui-focused fieldset": {
        borderColor: "gold",
      },
    },
  },
})(TextField);

const CssFormControl = withStyles({
  root: {
    "& .MuiInputBase-root": {
      color: "gold",
    },

    "& label.Mui-focused": {
      color: "gold",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "gold",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "gold",
      },
      "&:hover fieldset": {
        borderColor: "gold",
      },
      "&.Mui-focused fieldset": {
        borderColor: "gold",
      },
    },
  },
})(FormControl);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function ProductScreen(props) {
  const classes = useStyles();

  // retrive order list to check if the client has done the payment and can review the product
  // questa operazione resetta lo state di redux
  let isProductBuyed = false;
  const orderMineList = useSelector((state) => state.orderMineList);
  const { l, e, orders } = orderMineList;

  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(0);
  const [size, setSize] = useState("");
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
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (successReviewCreate) {
      window.alert("Recensione inviata correttamente!");
      setRating("");
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(listOrderMine()); // heree
    dispatch(detailsProduct(productId));
  }, [dispatch, productId, successReviewCreate]);

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}?size=${size}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();

    if (comment && rating) {
      // check if the user have acquired, paid and get deliverd the product
      for (let i = 0; i < orders.length; i++) {
        if (orders[i].isPaid === true && orders[i].isDelivered === true) {
          for (let j = 0; j < orders[i].orderItems.length; j++) {
            if (orders[i].orderItems[j].product === productId) {
              isProductBuyed = true;
            }
          }
        }
      }
      if (isProductBuyed) {
        dispatch(
          createReview(productId, { rating, comment, name: userInfo.name })
        );
      } else {
        alert("Devi aver acquistato il prodotto prima di poterlo recensire");
      }
    } else {
      alert("Perfavore inserire un commento e una votazione per la recensione");
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
          <Link to="/">Torna ai risultati</Link>
          <hr />
          <Row>
            <Col md={6}>
              <div>
                <img
                  className="large"
                  src={product.image}
                  alt={product.name}
                  id="product_image"
                ></img>
              </div>
            </Col>
            <Col md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h2" component="h2">
                    {product.name}
                  </Typography>

                  <Typography gutterBottom variant="h5" component="h2">
                    Descrizione:<p>{product.description}</p>
                  </Typography>
                  <Typography gutterBottom variant="h5" component="h2">
                    Codice negozio: {product.shopCode}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h5"
                    id="price_product"
                    component="h2"
                  >
                    <b>{product.price}€</b>
                  </Typography>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  ></Rating>
                </CardContent>
              </Card>

              <Row className="mt-4">
                <Col md={12}>
                  <Card>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Stato:{" "}
                        {product.sizeStockCount.map((sizeCount) =>
                          sizeCount.S > 0 ||
                          sizeCount.M > 0 ||
                          sizeCount.L > 0 ||
                          sizeCount.XL > 0 ||
                          sizeCount.XXL > 0 ||
                          sizeCount.XXXL > 0 ? (
                            <span className="success">In Stock</span>
                          ) : (
                            <span className="danger">Esaurito</span>
                          )
                        )}
                      </Typography>
                      {product.sizeStockCount.map(
                        (sizeCount) =>
                          (sizeCount.S > 0 ||
                            sizeCount.M > 0 ||
                            sizeCount.L > 0 ||
                            sizeCount.XL > 0 ||
                            sizeCount.XXL > 0 ||
                            sizeCount.XXXL > 0) && (
                            <>
                              <li>
                                <div className="row">
                                  <label>Taglia</label>
                                  <select
                                    title="Scegli una opzione"
                                    onChange={(e) => setSize(e.target.value)}
                                    defaultValue="Default"
                                  >
                                    <option value="Default" disabled>
                                      Seleziona una taglia
                                    </option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                    <option value="XXL">XXL</option>
                                    <option value="XXXL">XXXL</option>
                                  </select>
                                </div>
                              </li>

                              {size === "S" && (
                                <>
                                  <li>
                                    <div className="row">
                                      <div>Quantità</div>
                                      <div>
                                        <select
                                          value={qty}
                                          onChange={(e) =>
                                            setQty(e.target.value)
                                          }
                                        >
                                          <option>0</option>
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
                                      <div>Quantità</div>
                                      <div>
                                        <select
                                          value={qty}
                                          onChange={(e) =>
                                            setQty(e.target.value)
                                          }
                                        >
                                          <option>0</option>
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
                                      <div>Quantità</div>
                                      <div>
                                        <select
                                          value={qty}
                                          onChange={(e) =>
                                            setQty(e.target.value)
                                          }
                                        >
                                          <option>0</option>
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
                                      <div>Quantità</div>
                                      <div>
                                        <select
                                          value={qty}
                                          onChange={(e) =>
                                            setQty(e.target.value)
                                          }
                                        >
                                          <option>0</option>
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
                                      <div>Quantità</div>
                                      <div>
                                        <select
                                          value={qty}
                                          onChange={(e) =>
                                            setQty(e.target.value)
                                          }
                                        >
                                          <option>0</option>
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
                                      <div>Quantità</div>
                                      <div>
                                        <select
                                          value={qty}
                                          onChange={(e) =>
                                            setQty(e.target.value)
                                          }
                                        >
                                          <option>0</option>
                                          {[
                                            ...Array(sizeCount.XXXL).keys(),
                                          ].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                              {x + 1}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    </div>
                                  </li>
                                </>
                              )}
                              {size !== "" && qty > 0 && (
                                <>
                                  <li>
                                    <button
                                      onClick={addToCartHandler}
                                      className="primary block"
                                    >
                                      Aggiungi al carrello
                                    </button>
                                  </li>
                                </>
                              )}
                            </>
                          )
                      )}
                    </CardContent>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col md={9} className="mt-4">
              <Card>
                <CardContent>
                  <Typography variant="h8" component="h2">
                    Recensioni
                  </Typography>
                  {product.reviews.length === 0 && (
                    <Typography gutterBottom variant="h5" component="h2">
                      <MessageBox>
                        Non ci sono ancora recensioni per questo prodotto
                      </MessageBox>
                    </Typography>
                  )}
                  {product.reviews.map((review) => (
                    <Typography key={review._id} gutterBottom variant="h5" component="h2">
                        <strong>{review.name}</strong>
                        <Rating rating={review.rating} caption=" "></Rating>
                        <p>{review.createdAt.substring(0, 10)}</p>
                        <p>{review.comment}</p>
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </Col>

            <Col md={3} className="mt-4">
              <Card>
                {userInfo ? (
                  <form className={classes.root} >
                    <CardContent>
                      <Typography variant="h8" component="h2">
                        Scrivi una recensione
                      </Typography>

                      <CssFormControl
                        variant="outlined"
                        id="select_review"
                        className={classes.formControl}
                      >
                        <InputLabel htmlFor="outlined-age-native-simple" id="select_rating">
                          Valutazione
                        </InputLabel>
                        <Select
                          native
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                          label="Valutazione"
                          inputProps={{
                            name: "Valutazione",
                            id: "outlined-age-native-simple",
                          }}
                        >
                          <option aria-label="None" value="" />
                          <option value="1">1- Insufficiente</option>
                          <option value="2">2- Sufficiente</option>
                          <option value="3">3- Buono</option>
                          <option value="4">4- Molto buono</option>
                          <option value="5">5- Eccellente</option>
                        </Select>
                      </CssFormControl>

                      <form className={classes.root}>
                        <CssTextField
                          className="mt-4"
                          id="insert_review"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          label="Testo Recensione"
                          multiline
                          rows={5}
                          variant="outlined"
                        />
                      </form>
                      <div>
                        <Button
                          variant="contained"
                          color="primary"
                          className="mt-4"
                          id="send_review_button"
                          startIcon={<SaveIcon />}
                          onClick={submitHandler}
                        >
                          Invia recensione
                        </Button>
                      </div>
                    </CardContent>
                    <div>
                      {loadingReviewCreate && (
                        <CardContent>
                          <LoadingBox></LoadingBox>
                        </CardContent>
                      )}
                      {errorReviewCreate && (
                        <CardContent>
                          <MessageBox variant="danger">
                            {errorReviewCreate}
                          </MessageBox>
                        </CardContent>
                      )}
                    </div>
                  </form>
                ) : (
                  <CardContent>
                    <MessageBox>
                      Perfavore <Link to="/signin">Accedi</Link> per scrivere
                      una recensione
                    </MessageBox>
                  </CardContent>
                )}
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}
