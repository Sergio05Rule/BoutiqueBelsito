import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_RESET } from '../constants/userConstants';
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import { Row, Col, Dropdown, Container, Image } from "react-bootstrap/";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Form from "react-bootstrap/Form";
import TextField from "@material-ui/core/TextField";

export default function UserEditScreen(props) {
  const userId = props.match.params.id;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSeller, setIsSeller] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      props.history.push('/userlist');
    }
    if (!user) {
      dispatch(detailsUser(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsSeller(user.isSeller);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, props.history, successUpdate, user, userId]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update user
    dispatch(updateUser({ _id: userId, name, email, isSeller, isAdmin }));
  };
  return (
    <Container>
      <Row>
      <Col md={2}></Col>
        <Col md={8}>
          <Card>
            <CardContent>
      <Form className="form" onSubmit={submitHandler}>
          <h1>Modifica profilo utente{name}</h1>
          {loadingUpdate && <LoadingBox></LoadingBox>}
          {errorUpdate && (
            <MessageBox variant="danger">{errorUpdate}</MessageBox>
          )}
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
              <Form.Label className="mt-3" htmlFor="name">Nome utente</Form.Label>
              <Form.Control
                id="name"
                type="text"
                placeholder="Inserisci nuovo nome utente"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
              <Form.Label className="mt-3" htmlFor="email">email</Form.Label>
              <Form.Control
                id="email"
                type="email"
                placeholder="Inserisci nuova email utente"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
              <Form.Label className="mt-3" htmlFor="isSeller">E' un rivenditore</Form.Label>
              <Form.Control
                id="isSeller"
                type="checkbox"
                checked={isSeller}
                onChange={(e) => setIsSeller(e.target.checked)}
              ></Form.Control>
              <Form.Label className="mt-3" htmlFor="isAdmin">E' Admin</Form.Label>
              <Form.Control
                id="isAdmin"
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Control>
                     
              <Button type="submit"  variant="contained"
                      color="primary" className="w-100 mt-3" >
                Aggiorna
              </Button>
          </>
        )}
      </Form>
      </CardContent>
      </Card>
      </Col>
      <Col md={2}></Col>
</Row>
    </Container>
  );
}