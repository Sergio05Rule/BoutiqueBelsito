import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IconButton,
  AppBar,
  Toolbar,
  Button,
  Tooltip,
  Icon,
  Badge,
  Divider,
} from "@material-ui/core";
import { IconContext } from "react-icons";
import { FiMenu, FiFacebook, FiInstagram } from "react-icons/fi";
import { Row, Col, Dropdown, Container, Image } from "react-bootstrap/";
import { Link, Route } from "react-router-dom";
import "./footer.css";


const Aside = (props) => {
  //Mine
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  return (
    <footer className="footer">


<hr class="border-color-wvjs-color separator-no-padding" />

<Row className="contacts">
        <Col md={4} className="col_text">
        CHI SIAMO
        <Button component={Link} to={"/"} id="button_footer" size="sm" >Biografia</Button>
        <Button component={Link} to={"/"} id="button_footer" size="sm" >Eleganza & Qualità</Button>
        </Col>

        <Col md={4} className="col_text">
        CONDIZIONI DI ACQUISTO
        <Button component={Link} to={"/"} id="button_footer" size="sm" >Pagamenti</Button>
        <Button component={Link} to={"/"} id="button_footer" size="sm" >Spedizioni & resi</Button>
        </Col>

        <Col md={4} className="col_text">
        RESPONSABILITA'
        <Button component={Link} to={"/"} id="button_footer" size="sm" >Privacy</Button>
        <Button component={Link} to={"/"} id="button_footer" size="sm" >Cookie policy</Button>
        </Col>
</Row>


<hr />  


    <Row className="contacts">
        <Col md={4} className="col_text">
        METODI DI PAGAMENTO
        <Image className="footer_visa_image" src="../../../../uploads/visa-mastercard-paypal-bank.png"  />
        </Col>

        <Col md={4} className="col_text" >SEGUICI
            <Row className="text-row">
            <a className="col_icon" href="https://www.facebook.com/BoutiqueBelsito/">
            <FiFacebook  /></a>
            <a className="col_icon" href="https://www.instagram.com/boutique_belsito/?hl=it">
            <FiInstagram /></a>
            </Row>
        </Col>

        <Col md={4} className="col_text">
        SPEDIZIONI
        <Image className="footer_shipping_image" src="../../../../uploads/spedizioni.png"  />
        </Col>
      </Row>
      <Row className="contacts">
        <Col md={12}>
          © 2021 Boutique Belsito Tutti i diritti riservati
          <br></br>
          Via Dell'urbanistica 6, 76011 Bisceglie (BAT), Puglia P.IVA
          07492280727
          <br></br>
          <a
            className="personalTag"
            href="https://www.instagram.com/sergio05rule/"
          >
            Developed by @sergio05rule
          </a>
        </Col>
      </Row>
    </footer>  
    );
};

export default Aside;
