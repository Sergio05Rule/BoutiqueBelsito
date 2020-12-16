import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrderMine } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Button from "@material-ui/core/Button";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputLabel from "@material-ui/core/InputLabel";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import { Row, Col, Dropdown, Container, Image } from "react-bootstrap/";

export default function OrderHistoryScreen(props) {
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);
  return (
    <Container>
      <Row>
        <Col md={12}><h2>Storico degli ordini:</h2>
        </Col></Row>
      <Row>
        <Col md={12}>
        <Card>
            <CardContent>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th><h2>Numero Ordine</h2></th>
              <th><h2>Data</h2></th>
              <th><h2>Totale</h2></th>
              <th><h2>Pagato</h2></th>
              <th><h2>Spedito</h2></th>
              <th><h2>Azioni</h2></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
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
                  color="primary"
                  variant="contained"
                    type="button"
                    className="small"
                    onClick={() => {
                      props.history.push(`/order/${order._id}`);
                    }}
                  >
                    Dettagli
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </CardContent>
      </Card>
      </Col>
      </Row>
    </Container>
  );
}