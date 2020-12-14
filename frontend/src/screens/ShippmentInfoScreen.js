import React, { useEffect, useState } from "react";
import { Row, Col, Dropdown, Container } from "react-bootstrap/";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));
export default function ShipmentInfoScreen(props) {
  const classes = useStyles();

  //Render section of the components
  return (
    <Container>
    <Row>
      <Col md={6}>
        <div id="par_max">Spedizioni & Resi</div>
        <div id="par">Tempi di consegna e condizioni di reso</div>
        <br></br>
        <div id="par">Spedizioni</div>
        <div>
          I prodotti ordinati arrivano entro 3-5 giorni lavorativi (dal lunedì
          al venerdì) con spedizione espressa con codice per il tracciamento,
          generalmente con vettore GLS.<br></br>
          <br></br>
          Spedizione in tutta l’Italia, tranne isole e CAP disagiati, per le
          isole minori verranno applicati ulteriori tariffe sul trasporto.
        </div>
        <br></br><br></br>
        <div id="par">Diritto di recesso</div>
        <div>
          L’acquirente ha diritto di recedere dal contratto di acquisto, senza
          alcuna penalità, entro 14 giorni dalla ricezione della merce (ai sensi
          dell’art. 52 del Codice del Consumo). Per beneficiare del diritto di
          recesso su un prodotto acquistato, è necessario contattare il Servizio
          Clienti specificando i dettagli necessari (codice di ordine, prodotti
          da restituire, ecc.), attraverso l’indirizzo boutiquebelsitoshop@gmail.com
        </div>
        <br></br><br></br>
        <div id="par">Resi</div>
        <div>
          La procedura di reso sarà aperta solo a seguito di una richiesta di
          restituzione di un prodotto non conforme, difettoso o danneggiato. In
          ogni caso, si verificherà l’esistenza delle condizioni necessarie per
          aprire una procedura di reso. Per aprire una pratica di reso o di
          reclamo per prodotto danneggiato o non conforme, è necessario
          contattare il Servizio Clienti specificando i dettagli necessari
          (codice di ordine, prodotti oggetto della segnalazione, informazioni
          di contatto, ecc.), attraverso l’indirizzo boutiquebelsitoshop@gmail.com. Le spese
          di spedizione per il reso saranno a carico dell’acquirente e il
          rimborso verrà effettuato al ricevimento del prodotto restituito, con
          le stesse modalità utilizzate al momento dell’acquisto.{" "}
        </div>
      </Col>
    </Row>
    </Container>
  );
}
