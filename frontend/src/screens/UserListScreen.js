import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, listUsers } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_DETAILS_RESET } from '../constants/userConstants';
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import { Row, Col, Dropdown, Container, Image } from "react-bootstrap/";
import Button from "@material-ui/core/Button";

export default function UserListScreen(props) {
    const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listUsers());
    dispatch({
        type: USER_DETAILS_RESET,
      });
  }, [dispatch, successDelete]);
  const deleteHandler = (user) => {
    if (window.confirm("Sei sicuro di voler eliminare definitivamente il profilo dell'utente?")) {
      dispatch(deleteUser(user._id));
    }
  };
  return (
    <Container>
      <Row>
        <Col md={12}>
      <h1>Pannello di amministrazione utenti:</h1>
      </Col>
      </Row>

      <Row> <Col md={12}><Card><CardContent>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox variant="success">Utente eliminato correttamente</MessageBox>
      )}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID Utente:</th>
              <th>Nome utente</th>
              <th>email</th>
              <th>E' un rivenditore</th>
              <th>E' admin</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isSeller ? 'SI' : ' NO'}</td>
                <td>{user.isAdmin ? 'SI' : 'NO'}</td>
                <td>
                <Button
                color="primary"
                variant="contained"
                    type="button"
                    className="small"
                    onClick={() => props.history.push(`/user/${user._id}/edit`)}
                  >
                    Modifica
                  </Button>
                  <Button
                  color="primary"
                  variant="contained"
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(user)}
                  >
                    Cancella
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </CardContent></Card>
        </Col>
        </Row> 
    </Container>
  );
}