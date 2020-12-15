import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Form from "react-bootstrap/Form";
import Card from "@material-ui/core/Card";
import { Row, Col, Dropdown, Container, Image } from "react-bootstrap/";
import CardContent from "@material-ui/core/CardContent";


export default function SigninScreen(props) {

    // React hook
  const [email, setEmail] = useState(''); //default value empty
  const [password, setPassword] = useState('');

  const redirect = props.location.search 
    ? props.location.search.split('=')[1]
    :'/';

  const userSignin = useSelector((state) => state.userSignin)
  const {userInfo, loading, error} = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };
  useEffect(() => {
      if(userInfo){
          props.history.push(redirect);
      }
  },[props.history, redirect, userInfo]);
  return (
    <Container>
      <Row>
      <Col md={3}></Col>

      <Col md={6}>
      <Card><CardContent>
      <Typography variant="h5" component="h2">
      <h1>Accedi</h1>
      </Typography>

      <Form className="form" onSubmit={submitHandler}>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        
        <Typography variant="h5" component="h2">
          <Form.Label htmlFor="email">Indirizzo email</Form.Label>
          <Form.Control
            type="email"
            id="email"
            placeholder="Inserisci email di accesso"
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

          <Button color="primary" className="w-100" variant="contained"  type="submit">
            Accedi
          </Button>
          </Typography>

          <Typography variant="h5" component="h2">
          Nuovo cliente?{' '}
            <Link to={`/register?redirect=${redirect}`}>
              Crea un nuovo account in un semplice step!
            </Link>
            </Typography>

            <Typography variant="h5" component="h2">
          Password di accesso dimenticata?{' '}
            <Link to={`/forgotpassword?redirect=${redirect}`}>
              Clicca qui!
            </Link>
            </Typography>


      </Form>
      </CardContent></Card>
      </Col>
      <Col md={3}></Col>
      </Row>
    </Container>
  );
}