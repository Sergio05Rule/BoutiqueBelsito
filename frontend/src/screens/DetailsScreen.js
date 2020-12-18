import React from "react";
import { Row, Col, Container } from "react-bootstrap/";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));
export default function HomeScreen(props) {
  const classes = useStyles();

  //Render section of the components
  return (
    <Container>
      <Row>
        <Col md={6} xs={7}>
          <img class="img-fluid" alt="Responsive image" src="../../../../uploads/details_photo_1.jpeg"></img>
        </Col>
        <Col md={1} xs={2} ></Col>
        <Col md={5} xs={3}>
          <h2 id="biography">
            Simplicity is the keynote of all true elegance.<br></br>
            <br></br>La semplicità è la chiave della vera eleganza.<br></br>
            <br></br>"Coco chanel"
          </h2>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={5} xs={3} id="biography">
          <h2 id="biography">
            There is no art where there is no style.
            <br></br>
            <br></br>Non c’è arte là dove non c’è stile.<br></br>
            <br></br>"Oscar Wilde"
          </h2>
        </Col>
        <Col md={1} xs={2}></Col>

        <Col md={6} xs={7}>
          <img class="img-fluid" alt="Responsive image" src="../../../../uploads/details_photo_2.jpeg"></img>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={6} xs={7}>
          <img class="img-fluid" alt="Responsive image" src="../../../../uploads/details_photo_3.jpeg"></img>
        </Col>
        <Col md={1} xs={2}></Col>
        <Col md={5} xs={3} id="biography">
          <h2 id="biography">
          Elegance is not being noticed, it’s about being remembered.<br></br>
            <br></br>L'eleganza non è essere notati, ma essere ricordati.<br></br>
            <br></br>"Giorgio Armani"
          </h2>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={5} xs={3} id="biography">
          <h2 id="biography">
          Semplicità ed eleganza: 
          <br></br>
          <br></br>
          scegli lo stile che ti rende semplicemente unica.           
          </h2>
        </Col>
        <Col md={1} xs={2}></Col>

        <Col md={6} xs={7}>
          <img class="img-fluid" alt="Responsive image" src="../../../../uploads/details_photo_4.jpeg"></img>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={6} xs={7}>
          <img class="img-fluid" alt="Responsive image" src="../../../../uploads/details_photo_5.jpeg"></img>
        </Col>
        <Col md={1} xs={2}></Col>
        <Col md={5} xs={3} id="biography">
          <h2 id="biography">
          I dettagli rendono un capo perfetto e la perfezione per noi non è un dettaglio.
          </h2>
        </Col>
      </Row>



      <Row className="mt-5">
        <Col md={5} xs={3} id="biography">
          <h2 id="biography">
          Tradizione eleganza e classe.
          <br></br>
          <br></br>
          Since 1966.
           
          </h2>
        </Col>
        <Col md={1} xs={2}></Col>

        <Col md={6} xs={7}>
          <img class="img-fluid" alt="Responsive image" src="../../../../uploads/details_photo_6.jpeg"></img>
        </Col>
      </Row>




    </Container>

  );
}
