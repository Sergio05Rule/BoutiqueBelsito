import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import { Row, Col, Dropdown, Container } from "react-bootstrap/";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";

export default function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    props.history.push("/payment");
  }
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10); // Shipping price Cost!
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems })); // replace cart items with orderItems
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);
  return (
    <Container>
      <Row>
        <Col md={12}>
          <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
        </Col>
      </Row>
      <Row>
        <Col md={9}>
          <Card>
            <CardContent>
              <Typography variant="h2" component="h2">
                Informazioni di spedizione
              </Typography>
              <Typography variant="h5" component="h2">
                <strong>Nome:</strong> {cart.shippingAddress.fullName}
              </Typography>
              <Typography variant="h5" component="h2">
                <strong>Indirizzo: </strong> {cart.shippingAddress.address}
                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
                {cart.shippingAddress.country}
              </Typography>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardContent>
              <Typography variant="h2" component="h2">
                Informazioni di pagamento
              </Typography>
              <Typography variant="h5" component="h2">
                <strong>Metodo di pagamento:</strong> PayPal, Carta di credito o
                Carta di debito
              </Typography>
            </CardContent>
          </Card>

          <Card className="mt-4">
          <CardContent>

          <Typography variant="h2" component="h2">
          Oggetto/i ordine
          </Typography>
          {cart.cartItems.map((item) => (
            <Row className="mt-3">
              <Col md={3}>
                  <img src={item.image} alt={item.name} className="small"></img>
                  </Col>
                  <Col md={3} >
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                </Col>

                <Col md={3}>
                Taglia: {item.size}
                </Col>
                <Col md={3}>
                  {item.qty} x {item.price}€ = {item.qty * item.price}€
                </Col>
            </Row>
          ))}
            </CardContent>
          </Card>
        </Col>

        <Col md={3}>
          <Card>
            <CardContent>
              <Typography variant="h2" component="h2">
                Sommario ordine
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                Oggetto/i: {cart.itemsPrice.toFixed(2)}€
              </Typography>

              <Typography gutterBottom variant="h5" component="h2">
                Spedizione: {cart.shippingPrice.toFixed(2)}€
              </Typography>

              <Typography gutterBottom variant="h5" component="h2">
                Tasse: {cart.taxPrice.toFixed(2)}€
              </Typography>

              <Typography gutterBottom variant="h5" component="h2">
                <strong>Totale ordine: {cart.totalPrice.toFixed(2)}€</strong>
              </Typography>

              <Button
                type="button"
                onClick={placeOrderHandler}
                variant="contained"
                color="primary"
                className="w-100"
                disabled={cart.cartItems.length === 0}
              >
                Conferma ordine
              </Button>
              <Typography variant="h5" component="h2">
                    <Button color="secondary" className="w-100" variant="contained" component={Link} to="/payment">
                      Indietro
                    </Button>
                  </Typography>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox varina="danger">{error}</MessageBox>}
            </CardContent>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
