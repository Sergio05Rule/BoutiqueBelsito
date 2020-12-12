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
import BiographyScreen from '../../screens/BiographyScreen';
import DetailsScreen from '../../screens/DetailsScreen';
import PaymentInfoScreen from '../../screens/PaymentInfoScreen';
import ShippmentInfoScreen from '../../screens/ShippmentInfoScreen';
import PrivacyScreen from '../../screens/PrivacyScreen';
import CookieScreen from '../../screens/CookieScreen';



const Aside = (props) => {
  //Mine
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  return (
<footer className="bottom">
<Row className="contacts">
        <Col md={4} >
          <Col className="col_text" md={12}>CHI SIAMO</Col>
          <Col md={12}>        
            <Button component={BiographyScreen} to={"/"} id="button_footer" size="sm" >Biografia</Button>
          </Col>
          <Col md={12}><Button component={DetailsScreen} to={"/"} id="button_footer" size="sm" >Eleganza & Qualità</Button>
          </Col>
        </Col>

        <Col md={4} className="col_text">
          <Col md={12}className="col_text" >CONDIZIONI DI ACQUISTO</Col>
          <Col md={12} ><Button component={PaymentInfoScreen} to={"/"} id="button_footer" size="sm" >Pagamenti</Button></Col>
          <Col md={12} ><Button component={ShippmentInfoScreen} to={"/"} id="button_footer" size="sm" >Spedizioni & resi</Button></Col>
        </Col>

        <Col md={4} className="col_text">
        <Col md={12} className="col_text" >RESPONSABILITA'</Col>
        <Col md={12}><Button component={PrivacyScreen} to={"/"} id="button_footer" size="sm" >Privacy</Button></Col>
        <Col md={12}><Button component={CookieScreen} to={"/"} id="button_footer" size="sm" >Cookie policy</Button></Col>
        </Col>
</Row>
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
