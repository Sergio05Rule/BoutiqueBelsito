import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import { Row, Col, Dropdown, Container, Image } from "react-bootstrap/";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useTheme } from "@material-ui/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
    [theme.breakpoints.down("md")] : {
    maxWidth: 200
    },
    [theme.breakpoints.down("xs")] : {
      maxWidth: 275
      }
  },
  media: {
    height: 200
  }
}));

export default function Product(props) {
  const classes = useStyles();
  const theme = useTheme();


  const { product } = props;
  const prod_desc_lenght = (desc) => {
    console.log(desc);
    console.log(desc.length);
    if (desc.length > 40)
    {
      return false;
    }
    else{
      return true;
    }

  }

  

  return (
    <Card className={classes.root} key={product.id} id="product_card">
      <CardActionArea className="card"  to={`/product/${product._id}`} component={Link}>
        <CardMedia
          component="img"
          alt={product.image}
          height="140"
          image={product.image}
          title={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h8" component="h2">
            {product.name}
          </Typography>
          <Typography variant="h8" color="textSecondary" component="p">
            {
              prod_desc_lenght(product.description) ? (
                <>
                {product.description}
                </>
              ) : (
                <>
                {product.description.substring(0, Math.min(product.description.length, 40))}...
                </>
              )
              }
            
            
          </Typography>
          <Rating
            rating={product.rating}
            numReviews={product.numReviews}
          ></Rating>
          <div className="price">{product.price}€</div>
        </CardContent>
      </CardActionArea>
    
    </Card>
  );
}
