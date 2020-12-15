import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Form from "react-bootstrap/Form";
import Card from "@material-ui/core/Card";
import { Row, Col, Dropdown, Container, Image } from "react-bootstrap/";
import CardContent from "@material-ui/core/CardContent";

export default function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password e Conferma Password non corrispondono");
    } else {
      if (password.length < 6) {
        alert("La Password deve essere lunga almeno 6 caratteri");
      } else {
        dispatch(register(name, email, password));
      }
    }
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <Container>
      <Row>
        <Col md={3}></Col>

        <Col md={6}>
          <Card>
            <CardContent>
              <Form className="form" onSubmit={submitHandler}>
                <Typography variant="h5" component="h2">
                  <h1>Crea Account</h1>
                </Typography>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <Typography variant="h5" component="h2">
                  <Form.Label htmlFor="name">Nome utente</Form.Label>
                  <Form.Control
                    type="text"
                    id="name"
                    placeholder="Inserisci nome utente"
                    required
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Typography>

                <Typography variant="h5" component="h2">
                  <Form.Label htmlFor="email">Indirizzo email</Form.Label>
                  <Form.Control
                    type="email"
                    id="email"
                    placeholder="Inserisci email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  ></Form.Control>
                  </Typography>

                  <Typography variant="h5" component="h2">
                  <Form.Label htmlFor="password">Password</Form.Label>
                  <Form.Control
                    type="password"
                    id="password"
                    placeholder="Inserisci password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                  </Typography>

                  <Typography variant="h5" component="h2">
                  <Form.Label htmlFor="confirmPassword">Conferma Password</Form.Label>
                  <Form.Control
                    type="password"
                    id="confirmPassword"
                    placeholder="Inserisci conferma password"
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  ></Form.Control>
                  </Typography>

                  <Typography variant="h5" component="h2">
                  <Button color="primary" className="w-100" variant="contained"  type="submit">
                    Registrati
                  </Button>
                  </Typography>

                  <Typography variant="h5" component="h2">
                    Hai già un account?{" "}
                    <Link to={`/signin?redirect=${redirect}`}>Accedi</Link>
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
