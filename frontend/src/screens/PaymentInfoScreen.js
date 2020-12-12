import React, { useEffect, useState } from "react";
import { Row, Col, Dropdown, Container } from "react-bootstrap/";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));
export default function PaymentInfoScreen(props) {

    const classes = useStyles();

  //Render section of the components
  return (
      <Row>
      <Col md={6}>
      <div id="par">Informazioni generali</div>
      <br></br>
        <div >Tempi di consegna e condizioni di reso
        <br></br>
        Sono accettati i più diffusi e sicuri metodi di pagamento, così da poter venire incontro a tutte le esigenze. Inoltre è possibile ritirare e pagare il proprio prodotto fissando un appuntamento, contattandoci al nostro indirizzo email boutiquebelsitoshop@gmail.com<br></br>
        <br></br>Una volta aggiunti i prodotti desiderati al carrello, vi basterà procedere con l’ordine e al momento della conferma selezionare con la spunta l’opzione di pagamento desiderata tra:<br></br>
          <br></br><li>Carta di Credito (Visa, MasterCard, ecc);</li>
          <li>PayPal;</li>
          <li>Bonifico bancario.</li>

        </div>
        
      </Col>
      
      </Row>
  );
}
