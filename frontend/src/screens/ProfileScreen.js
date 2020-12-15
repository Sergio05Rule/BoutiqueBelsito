import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Form from "react-bootstrap/Form";
import Card from "@material-ui/core/Card";
import { Row, Col, Dropdown, Container, Image } from "react-bootstrap/";
import CardContent from "@material-ui/core/CardContent";

export default function ProfileScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userInfo._id, user]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update profile
    if (password !== confirmPassword) {
      alert("Password e Conferma Password non corrispondo");
    } else {
      dispatch(updateUserProfile({ userId: user._id, name, email, password }));
    }
  };
  return (
    <Container>
      <Row>
        <Col md={3}></Col>

        <Col md={6}>
          <Card>
            <CardContent>
              <Form className="form" onSubmit={submitHandler}>
                <Typography variant="h5" component="h2">
                  <h1>Modifica Profilo:</h1>
                </Typography>
                {loading ? (
                  <LoadingBox></LoadingBox>
                ) : error ? (
                  <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                  <>
                    {loadingUpdate && <LoadingBox></LoadingBox>}
                    {errorUpdate && (
                      <MessageBox variant="danger">{errorUpdate}</MessageBox>
                    )}
                    {successUpdate && (
                      <MessageBox variant="success">
                        Profilo aggiornato con successo
                      </MessageBox>
                    )}
                    <Typography variant="h5" component="h2">
                      <Form.Label htmlFor="name">Nome utente</Form.Label>
                      <Form.Control
                        id="name"
                        type="text"
                        placeholder="Inserisci nuovo nome utente"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      ></Form.Control>
                    </Typography>
                    <Typography variant="h5" component="h2">
                      <Form.Label htmlFor="email">Email</Form.Label>
                      <Form.Control
                        id="email"
                        type="email"
                        placeholder="Inserisci nuova mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      ></Form.Control>
                    </Typography>
                    <Typography variant="h5" component="h2">
                      <Form.Label htmlFor="password">Password</Form.Label>
                      <Form.Control
                        id="password"
                        type="password"
                        placeholder="Inserisci nuova password"
                        onChange={(e) => setPassword(e.target.value)}
                      ></Form.Control>
                    </Typography>
                    <Typography variant="h5" component="h2">
                      <Form.Label htmlFor="confirmPassword">
                        Conferma Password
                      </Form.Label>
                      <Form.Control
                        id="confirmPassword"
                        type="password"
                        placeholder="Inserisci nuova password di conferma"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      ></Form.Control>
                    </Typography>
                    <Typography variant="h5" component="h2">
                      <Button  color="primary" className="w-100" variant="contained" type="submit">
                        Aggiorna profilo
                      </Button>
                    </Typography>
                    
                  </>
                )}
              </Form>
            </CardContent>
          </Card>
        </Col>

        <Col md={3}></Col>
      </Row>
    </Container>
  );
}
