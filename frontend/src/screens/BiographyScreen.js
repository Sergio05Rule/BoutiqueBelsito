import React, { useEffect, useState } from "react";
import { Row, Col, Dropdown, Container } from "react-bootstrap/";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },

  typography: {
    fontFamily: " Arial",
  },

  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function HomeScreen(props) {
  const classes = makeStyles();

  //Render section of the components
  return (
    <Container>
      <Row>
        <Col md={12} >
                <img src="../../../../uploads/bio_photo_1.jpeg">
                </img>
        </Col>

        <Col md={12} className="mt-3">
          <Card>
            <CardContent>
              <Typography variant="h2" component="h2">
                <label id="biography">
                  Oggi Boutique Belsito S.R.L.S persegue il caposaldo dell'eleganza in capi
                  d’abbigliamento e accessori con focus assoluto sul mondo della
                  moda femminile.<br></br><br></br>Ci troviamo in Puglia
                  a Bisceglie (BT), in Via dell’Urbanistica 6. <br></br><br></br>Siamo una
                  piccola azienda a carattere famigliare composta da Antonio
                  Belsito, Grazia Galantino e i loro due figli Danilo e Gigi.
                </label>
              </Typography>
            </CardContent>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5" className={classes.root} component="h2">
              Inizialmente nel lontano 1966,<br></br> l' attività è amministrata e
                  guidata dai nonni Rosa Cangelli e Biagio Belsito e non nasce
                  come negozio d’abbigliamento, bensì si occupava della vendita
                  dei tessuti a metraggio al dettaglio. Il nome originale, mantenuto per cinquant'anni è “Eurotessile”. 
                  <br></br><br></br>
                  A partire
                  dalla metà degli anni 70, la famiglia Belsito si è
                 
                  specializzata nell'abbigliamento maschile e femminile.  <br></br><br></br>Il viaggio
                  di Nonno Biagio e nonna Rosa è andato avanti con suo figlio
                  Antonio, artefice insieme a sua moglie Grazia della prima vera
                  evoluzione con la nascita della Boutique
                  Belsito.<br></br><br></br>
                  L’eredità di questa attività è passata dal padre
                  Antonio ai figli Gigi e il neo laureato in
                  lingue straniere all’università di Bari Aldo Moro: Danilo. 
              </Typography>
            </CardContent>
          </Card>
        </Col>
        <Col md={9}>
        <img src="../../../../uploads/bio_photo_2.jpeg">
                </img>
        </Col>
      </Row>

      <Row className="mt-5">
      <Col md={6}>
        <img src="../../../../uploads/bio_photo_3.jpeg">
        </img>
        </Col>
        <Col md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" className={classes.root} component="h2">
                 Da circa 54
                  anni la Famiglia Belsito vive di moda,
                  conservando la storia, la tradizione, l’eleganza e la classe
                  che la contraddistingue.<br></br><br></br>Il segreto della nostra famiglia è
                  lavorare da sempre con grande attenzione, passione, dedizione
                  e professionalità al servizio dei nostri clienti, che rappresentano per noi la nostra massima priorità.
                  <br></br><br></br>Con questo intento nasce oggi 01/01/2021 <strong>boutiquebelsito.it</strong>{" "}
              </Typography>
            </CardContent>
          </Card>
                <img className="mt-3" src="../../../../uploads/bio_photo_4.jpeg">
                </img>
        </Col>
        
      </Row>
    </Container>
  );
}
