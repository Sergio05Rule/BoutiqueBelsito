import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, listOrders } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELETE_RESET } from '../constants/orderConstants';
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import { Row, Col, Dropdown, Container, Image } from "react-bootstrap/";
import Button from "@material-ui/core/Button";

export default function OrderListScreen(props) {
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: ORDER_DELETE_RESET });
    dispatch(listOrders());
}, [dispatch, successDelete]);
const deleteHandler = (order) => {
    if (window.confirm("Sei sicuro di voler cancellare definitivamente l'ordine e tutte le informazioni ad esso legato?")) {
        dispatch(deleteOrder(order._id));
      }
    };
  return (
    <Container>
       <Row>
        <Col md={12}>
      <h1>Pannello di amministrazione ordini:</h1>
      </Col>
      </Row>

      <Row> <Col md={12}><Card><CardContent>

      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {successDelete && (
        <MessageBox variant="success">Ordine eliminato correttamente</MessageBox>
      )}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Numero Ordine</th>
              <th>Nome Cliente</th>
              <th>Data</th>
              <th>Totale</th>
              <th>Pagato</th>
              <th>Spedito</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'No'}
                </td>
                <td>
                  <Button
                    type="button"
                    color="primary"
                    variant="contained"
                    className="small"
                    onClick={() => {
                      props.history.push(`/order/${order._id}`);
                    }}
                  >
                    Dettagli
                  </Button>
                  <Button
                  color="primary"
                  variant="contained"
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(order)}
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