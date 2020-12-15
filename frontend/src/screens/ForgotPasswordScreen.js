import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { forgotpassword } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Form from "react-bootstrap/Form";
import Card from "@material-ui/core/Card";
import { Row, Col, Dropdown, Container, Image } from "react-bootstrap/";
import CardContent from "@material-ui/core/CardContent";

export default function ForgotPasswordScreen(props) {
  const [email, setEmail] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userForgotPassword = useSelector((state) => state.userForgotPassword);
  const { userInfo, loading, error } = userForgotPassword;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotpassword(email));
    //props.history.push(redirect)
  };
  useEffect(() => {
    if (userInfo) {
      //props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <Container>
      <Row>
        <Col md={3}></Col>
        <Col md={6}>
        <Card><CardContent>
          <Form className="form" onSubmit={submitHandler}>
          <Typography variant="h5" component="h2">
              <h1>Recupera Password</h1>
            </Typography>
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
            {userInfo && (
              <MessageBox variant="success">
                Profilo aggiornato con successo, controlla la tua mail per
                scoprire la nuova Password
              </MessageBox>
            )}
        <Typography variant="h5" component="h2">
              <Form.Label htmlFor="email">
                Inserisci l'indirizzo email dell'account di cui vuoi recuperare
                la password. <br></br>La password ti verrà inviata direttamente
                nella tua mail di posta elettronica.
              </Form.Label>
              <Form.Control
                type="email"
                id="email"
                placeholder="Inserisci email"
                required
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Typography>

            <Typography variant="h5" component="h2">
              <Button color="secondary" className="w-100" variant="contained" type="submit">
                Recupera Password
                </Button>
            </Typography>

            <Typography variant="h5" component="h2">
                Nuovo cliente?{" "}
                <Link to={`/register?redirect=${redirect}`}>
                  Crea un nuovo account in un semplice step!
                </Link>
            </Typography>
          </Form>
          </CardContent>
          </Card>
        </Col>
        <Col md={3}></Col>
      </Row>
    </Container>
  );
}
