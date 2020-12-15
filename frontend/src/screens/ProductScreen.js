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
import SaveIcon from "@material-ui/icons/Save";
import { GoVerified } from "react-icons/go";
import { FaTimes } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";



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

const CssFormControl_buy = withStyles({
  root: {
    "& .MuiInputBase-root": {
      color: "black",
    },

    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "black",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "black",
      },
      "&:hover fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
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
  const [size, setSize] = useState("Default");
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
    props.history.push(`/cart/${productId}?qty=${qty}&size=${size}`);
  };

  //@ the product loading
  const sizeInStock = [];
  const valueInStock = [];
  var isProductInStock_flag = false;
  if (product) {
    var obj = product.sizeStockCount[0];
    for (var prop in obj) {
      if (
        prop === "S" ||
        prop === "M" ||
        prop === "L" ||
        prop === "XL" ||
        prop === "XXL" ||
        prop === "XXXL"
      ) {
        // check if the oredered qty > stock_qty
        if (obj[prop] > 0) {
          isProductInStock_flag = true;
          sizeInStock.push(prop);
          valueInStock.push(obj[prop]);
        }
      }
    }
  }

  const populateSelectSize = () => {
    let options = [];
    for (var i = 0; i < sizeInStock.length; i++) {
      options.push(
        <option key={sizeInStock[i]} value={sizeInStock[i]}>
          {sizeInStock[i]}
        </option>
      );
    }
    return options;
  };

  const populateSelectQty = (size) => {
    let options = [];
    for (var i = 0; i < sizeInStock.length; i++) {
      if (sizeInStock[i] === size) {
        for (var j = 0; j < valueInStock[i]; j++) {
          var value = j + 1;
          options.push(
            <option key={value} value={value}>
              {value}
            </option>
          );
        }
      }
    }
    return options;
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
    <Container>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Button id="back_to_result" component={Link} to="/" variant="contained" >
  Torna ai risultati
</Button>
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
                  <hr />
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

          

                    {isProductInStock_flag ? (
                      <Row className="mt-2">
                        <Col md={3}>
                          <Col md={12}>
                          <GoVerified
                          id = "state_icon_available"
                          ></GoVerified>
                          </Col>
                          <Col md={12}>
                          <span className="success">Stato :In Stock</span>
                          </Col>
                        </Col>
                        <Col md={3}>
                          <CssFormControl_buy
                            variant="outlined"
                          >
                            <InputLabel
                              htmlFor="outlined-age-native-simple"
                            >
                              Taglia
                            </InputLabel>
                            <Select
                              native
                              value={size}
                              onChange={(e) => setSize(e.target.value)}
                              defaultValue="Default"
                            >
                              <option value="Default" >
Taglia                              </option>
                              {populateSelectSize()}
                            </Select>
                          </CssFormControl_buy>
                        </Col>

                        {size !== "Default" && (
                          <Col md={3}>
                            <CssFormControl_buy
                            variant="outlined"
                          >
                            <InputLabel
                            >
                              Quantità
                            </InputLabel>
                            <Select
                              native
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                              defaultValue="Default"
                              inputProps={{
                                name: "Default",
                                id: "outlined-age-native-simple",
                              }}
                            >
                              <option value="Default" >
                                Quantità
                              </option>
                              {populateSelectQty(size)}
                            </Select>
                          </CssFormControl_buy>

                          </Col>
                        )}

                        {size !== "Default" && qty > 0 && (
                          <Col md={3}>
                            <Button
                              onClick={addToCartHandler}
                              className="primary block"
                              size="large"
                            >
                            <AiOutlineShoppingCart id="cart_icon"></AiOutlineShoppingCart>
                          </Button>
                          </Col>
                        )}
                      </Row>
                    ) : (
                      <Col md={4}>
                      <Typography gutterBottom variant="h5" component="h2">
                      <MessageBox variant="danger">Stato: Esaurito</MessageBox>
                      </Typography>
                      </Col>

                    )}
                  <div className="mt-3">
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  ></Rating>
                  </div>
                </CardContent>
              </Card>
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
                    <div>
                      <hr />
                      <Typography
                        key={review._id}
                        gutterBottom
                        variant="h5"
                        component="h2"
                      >
                        <strong>{review.name}</strong>
                        <Rating rating={review.rating} caption=" "></Rating>
                        <p>{review.createdAt.substring(0, 10)}</p>
                        <p>{review.comment}</p>
                      </Typography>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </Col>

            <Col md={3} className="mt-4">
              <Card>
                {userInfo ? (
                  <form className={classes.root}>
                    <CardContent>
                      <Typography variant="h8" component="h2">
                        Scrivi una recensione
                      </Typography>

                      <CssFormControl
                        variant="outlined"
                        id="select_review"
                        className={classes.formControl}
                      >
                        <InputLabel
                          htmlFor="outlined-age-native-simple"
                          id="select_rating"
                        >
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
    </Container>
  );
}
