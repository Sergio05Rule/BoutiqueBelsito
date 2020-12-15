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
      <Row>
        <h1>Carrello: </h1>
      </Row>
      <Row>
        <Col md={9}>
          <Card>
            <CardContent>
              {cartItems.length === 0 ? (
                <Row>
                  <MessageBox>
                    Il carello è vuoto.<Link to="/">Go Shopping!</Link>
                  </MessageBox>
                </Row>
              ) : (
                <>
                  {cartItems.map((item) => (
                    <Row className="mt-5">
                      <Col md={2}>
                        <img
                          className="small"
                          src={item.image}
                          alt={item.name}
                        ></img>
                      </Col>
                      <Col md={2}>
                        <Typography gutterBottom variant="h5" component="h2">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Typography>
                      </Col>
                      <Col md={2}>
                        <Typography gutterBottom variant="h5" component="h2">
                          Taglia: {item.size}
                        </Typography>
                      </Col>
                      <Col md={2}>
                        <Typography gutterBottom variant="h5" component="h2">
                          <CssFormControl_buy size="small" variant="outlined">
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
                        </Typography>
                      </Col>
                      <Col md={2}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {item.price}€
                        </Typography>
                      </Col>
                      <Col md={2}>
                        <Typography gutterBottom variant="h5" component="h2">
                          <Button
                            type="button"
                            color="secondary"
                            variant="contained"
                            onClick={() => removeFromCartHandler(item.product)}
                          >
                            Rimuovi
                          </Button>
                        </Typography>
                      </Col>
                    </Row>
                  ))}
                </>
              )}
            </CardContent>
          </Card>
        </Col>
        <Col md={3}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Subtotale ({cartItems.reduce((a, c) => a + c.qty, 0)}{" "}
                oggetto/i): {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                €
              </Typography>
              <div className="text-center">
                <Typography gutterBottom variant="h5" component="h2">
                  <Button
                    type="button"
                    onClick={checkoutHandler}
                    color="primary"
                    variant="contained"
                    disabled={cartItems.length === 0}
                  >
                    Procedi al Checkout
                  </Button>
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
