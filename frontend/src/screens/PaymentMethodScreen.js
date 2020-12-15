import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { Row, Col, Dropdown, Container } from "react-bootstrap/";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "blu",
    marginLeft: theme.spacing(6)
  }
}));
export default function PaymentMethodScreen(props) {
  const classes = useStyles();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    props.history.push("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/placeorder");
  };
  return (
    <Container>
      <Row>
        <Col md={12}>
          <CheckoutSteps step1 step2 step3></CheckoutSteps>
        </Col>
      </Row>

      <Row>
        <Col md={4}></Col>
        <Col md={4}>
          <Card>
            <CardContent>
              <Form onSubmit={submitHandler} className="text-center">
                <Typography variant="h5" component="h2">
                  <h1>Metodo di pagamento</h1>
                </Typography>

                <Typography variant="h5" component="h2">
                  <RadioGroup
                    name="paymen"
                    className={classes.root}
                    value="paypal"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <FormControlLabel
                      value="paypal"
                      control={<Radio />}
                      label="Paypal, Carta di credito o carta di debito"
                    />
                  </RadioGroup>
                </Typography>

                <Col>
                  <Typography variant="h5" component="h2">
                   
                    <Button color="primary"    variant="contained" className="w-100" type="submit">
                      Continua
                    </Button>
                  </Typography>
                </Col>

                <Col>
                  <Typography variant="h5" component="h2">
                    <Button
                      color="secondary"
                      className="w-100"
                      variant="contained"
                      component={Link}
                      to="/shipping"
                    >
                      Indietro
                    </Button>
                  </Typography>
                </Col>
              </Form>
            </CardContent>
          </Card>
        </Col>
        <Col md={4}></Col>
      </Row>
    </Container>
  );
}
