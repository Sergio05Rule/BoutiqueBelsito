import Axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deliverOrder, detailsOrder, payOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";
import { Row, Col, Dropdown, Container } from "react-bootstrap/";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";

export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;
  const dispatch = useDispatch();
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}&currency=EUR`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, order, orderId, sdkReady, successPay, successDeliver]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <Container>
    <Row>
      <Col md={12}><h1>Numer Ordine: {order._id}</h1></Col>
      </Row>
      <Row>
        <Col md={8}>
          <Card>
            <CardContent>
              <Typography variant="h2" component="h2">
                Informazioni di spedizione
              </Typography>
              <Typography variant="h5" component="h2">
                <strong>Nome:</strong> {order.shippingAddress.fullName}
              </Typography>

              <Typography variant="h5" component="h2">
                <strong>Indirizzo: </strong> {order.shippingAddress.address},
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                ,{order.shippingAddress.country}
              </Typography>
              {order.isDelivered ? (
                <Typography variant="h5" component="h2">
                  <MessageBox variant="success">
                    Spedito il {order.deliveredAt}
                  </MessageBox>
                </Typography>
              ) : (
                <Typography variant="h5" component="h2">
                  <MessageBox variant="danger">Non ancora spedito</MessageBox>
                </Typography>
              )}
            </CardContent>
          </Card>

          <Card className="mt-3">
            <CardContent>
              <Typography variant="h2" component="h2">
                Informazioni di pagamento
              </Typography>

              <Typography variant="h5" component="h2">
                <strong>Medoto di pagamento:</strong> {order.paymentMethod}
              </Typography>
              {order.isPaid ? (
                <Typography variant="h5" component="h2">
                  <MessageBox variant="success">
                    Pagato il {order.paidAt}
                  </MessageBox>
                </Typography>
              ) : (
                <Typography variant="h5" component="h2">
                  <MessageBox variant="danger">Non pagato</MessageBox>
                </Typography>
              )}
            </CardContent>
          </Card>
          <Card className="mt-3">
            <CardContent>
              <Typography variant="h2" component="h2">
                Oggetti ordine
              </Typography>
              {order.orderItems.map((item) => (
                <Row className="mt-3">
                  <Col md={3}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="small"
                    ></img>
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={3}>Taglia: {item.size}</Col>
                  <Col md={3}>
                    {item.qty} x {item.price}€ = {item.qty * item.price}€
                  </Col>
                </Row>
              ))}
            </CardContent>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mt-3">
            <CardContent>  
            <Typography variant="h2" component="h2">
                Sommario ordine
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                    Oggetto/i: {order.itemsPrice.toFixed(2)}€
                    </Typography>
                  <Typography gutterBottom variant="h5" component="h2">
                  Spedizione: {order.shippingPrice.toFixed(2)}€
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                    Tasse: {order.taxPrice.toFixed(2)}€
                    </Typography>
                  <Typography gutterBottom variant="h5" component="h2">
                     <strong>Totale oridine: {order.totalPrice.toFixed(2)}€</strong>
                    </Typography>
              {!order.isPaid && ( // if true render this JSX element
                <>
                  {!sdkReady ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    <>
                      {errorPay && (
                        <MessageBox variant="danger">{errorPay}</MessageBox>
                      )}
                      {loadingPay && <LoadingBox></LoadingBox>}
                      <PayPalButton
                        amount={order.totalPrice}
                        options={{
                          clientId: process.env.PAYPAL_CLIENT_ID
                          ,currency:"EUR"
                        }}
                        onSuccess={successPaymentHandler}
                      />
                    </>
                  )}
                </>
              )}
              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <>
                  {loadingDeliver && <LoadingBox></LoadingBox>}
                  {errorDeliver && (
                    <MessageBox variant="danger">{errorDeliver}</MessageBox>
                  )}
                  <Button
                    type="button"
                    variant="contained"
                color="primary"
                className="w-100"
                    onClick={deliverHandler}
                  >
                    Segna come spedito
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
