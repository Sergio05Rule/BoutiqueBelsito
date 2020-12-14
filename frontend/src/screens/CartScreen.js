import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";
import "./css/CartScreen.css";
import { Row, Col, Dropdown, Container, Image } from "react-bootstrap/";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputLabel from "@material-ui/core/InputLabel";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

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

export default function CartScreen(props) {
  const classes = useStyles();

  const productId = props.match.params.id; // retrive id from url
  const qty = props.location.search // retrive qty
    ? Number(
        props.location.search
          .split("=")[1]
          .substring(0, props.location.search.split("=")[1].length - 5)
      ) // if exisit the cast->Number()
    : 1; //else 1

  const size = props.location.search
    ? props.location.search.split("=")[2] // if exisit the cast->Number()
    : "";

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  // useEffect input (function, dependecy list)
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty, size));
    }
  }, [dispatch, productId, qty, size]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  const populateSelectQty = (sizeInStock, size) => {
    var value;
    for (var prop in sizeInStock) {
      if (prop === size) {
        // check if the oredered qty > stock_qty
        if (sizeInStock[prop] > 0) {
          value = sizeInStock[prop];
        }
      }
    }

    let options = [];
    for (var i = 0; i < value; i++) {
      var value_to_push = i + 1;
      options.push(
        <option key={value_to_push} value={value_to_push}>
          {value_to_push}
        </option>
      );
    }
    return options;
  };

  return (
    <Container>
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
                      <img src={item.image} alt={item.name} className=""></img>
                    </div>
                    <div className="">
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>

                    <div>Taglia:{item.size}</div>

                    <div>
                      {size !== "Default" && (
                        <Col md={3}>
                          <CssFormControl_buy variant="outlined">
                            <InputLabel>Quantità</InputLabel>
                            <Select
                              native
                              value={item.qty}
                              onChange={(e) =>
                                dispatch(
                                  addToCart(
                                    item.product,
                                    Number(e.target.value),
                                    item.size
                                  )
                                )
                              }
                              inputProps={{
                                name: "Default",
                                id: "outlined-age-native-simple",
                              }}
                            >
                              {populateSelectQty(
                                item.sizeStockCount[0],
                                item.size
                              )}
                            </Select>
                          </CssFormControl_buy>
                        </Col>
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
                  Subtotale ({cartItems.reduce((a, c) => a + c.qty, 0)}{" "}
                  oggetto/i) :
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
    </Container>
  );
}
