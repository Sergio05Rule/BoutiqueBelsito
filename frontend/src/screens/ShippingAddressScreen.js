import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { GoVerified } from "react-icons/go";
import CardContent from "@material-ui/core/CardContent";
import { Row, Col, Dropdown, Container, Image } from "react-bootstrap/";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";


export default function ShippingAddressScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!userInfo) {
    props.history.push("/signin");
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country })
    );
    props.history.push("/payment");
  };
  return (
    <Container fluid>
      <Row>
        <Col>
          <CheckoutSteps step1 step2></CheckoutSteps>
        </Col>
      </Row>

      <Row>
        <Col md={4} xs={1} ></Col>
        <Col md={4} xs={10} className="text-center">
          <Card>
            <CardContent>
              <Form onSubmit={submitHandler}>
                <Typography variant="h5" component="h2">
                  <Col>
                    <h1>Indirizzo di spedizione:</h1>
                  </Col>
                </Typography>

                <Col>
                  <Typography variant="h5" component="h2">
                    <Form.Control
                      className="w-100"
                      type="text"
                      id="fullName"
                      placeholder="Inserisci nome completo"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      size="lg"
                    ></Form.Control>
                  </Typography>
                </Col>

                <Col>
                  <Typography variant="h5" component="h2">
                    <Form.Control
                      size="lg"
                      type="text"
                      id="address"
                      placeholder="Inserisci indirizzo"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    ></Form.Control>
                  </Typography>
                </Col>

                <Col>
                  <Typography variant="h5" component="h2">
                    <Form.Control
                      type="text"
                      id="city"
                      placeholder="Inserisci città"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      size="lg"
                    ></Form.Control>
                  </Typography>
                </Col>

                <Col>
                  <Typography variant="h5" component="h2">
                    <Form.Control
                      type="text"
                      id="postalCode"
                      placeholder="Codice postale"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      required
                      size="lg"
                    ></Form.Control>
                  </Typography>
                </Col>

                <Col>
                  <Typography variant="h5" component="h2">
                    <Form.Control
                      size="lg"
                      type="text"
                      id="country"
                      placeholder="Inserisci paese"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                    ></Form.Control>
                  </Typography>
                </Col>

                <Col>
                  <Typography variant="h5" component="h2">
                    <Button color="primary" className="w-100" variant="contained" type="submit">
                      Continua
                    </Button>
                  </Typography>
                </Col>
                <Col>

                  <Typography variant="h5" component="h2">
                    <Button color="secondary" className="w-100" variant="contained" component={Link} to="/cart">
                      Indietro
                    </Button>
                  </Typography>
                </Col>
              </Form>
            </CardContent>
          </Card>
        </Col>
        <Col md={4} xs={1}></Col>
      </Row>
    </Container>
  );
}
