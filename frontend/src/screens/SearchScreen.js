import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { listProducts } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";
import Rating from "../components/Rating";
import { prices, ratings } from "../utils";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import { Row, Col, Dropdown, Container, Image } from "react-bootstrap/";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";

export default function SearchScreen(props) {
  const {
    name = "all",
    category = "all",
    min = 0,
    max = 0,
    rating = 0,
    order = "newest",
  } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;

  useEffect(() => {
    dispatch(
      listProducts({
        name: name !== "all" ? name : "",
        category: category !== "all" ? category : "",
        min,
        max,
        rating,
        order,
      })
    );
  }, [category, dispatch, max, min, name, order, rating]);

  const getFilterUrl = (filter) => {

    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    const filterRating = filter.rating || rating;
    const sortOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}`;
  };
  return (
    <Container>
      <Row>
        <Col md={3}>
          <Card>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                id="price_product"
                component="h2"
              >
                Ordina per{" "}
              </Typography>
              <Select
              variant="outlined" 
              size="sm"
              native     
                value={order}
                className=""
                onChange={(e) => {
                  props.history.push(getFilterUrl({ order: e.target.value }));
                }}
              >
                <option value="newest">Nuovi arrivi</option>
                <option value="lowest">
                  Prezzo: dal più basso al più alto
                </option>
                <option value="highest">
                  Prezzo: dal più alto al più basso
                </option>
                <option value="toprated">Per media recensioni utenti</option>
              </Select>
             
      <h3 className="mt-3">Filtra per Categoria:</h3>
      {loadingCategories ? (
        <LoadingBox></LoadingBox>
      ) : errorCategories ? (
        <MessageBox variant="danger">{errorCategories}</MessageBox>
      ) : (
        <>
            <Link
              className={"all" === category ? "active" : ""}
              to={getFilterUrl({ category: "all" })}
            >
              Tutte le categorie
            </Link>
          {categories.map((c) => (
            <div>
              <Link
                className={c === category ? "active" : ""}
                to={getFilterUrl({ category: c })}
              >
                {c}
              </Link>
              </div>
          ))}
      </>
      )}
      <h3 className="mt-3">Filtra per Prezzo:</h3>
        {prices.map((p) => (
          <div>
            <Link
              to={getFilterUrl({ min: p.min, max: p.max })}
              className={
                `${p.min}-${p.max}` === `${min}-${max}` ? "active" : ""
              }
            >
              {p.name}
            </Link>
            </div>
        ))}
      <h3 className="mt-3">Per media recensioni utenti</h3>
        {ratings.map((r) => (
            <Link
              to={getFilterUrl({ rating: r.rating })}
              className={`${r.rating}` === `${rating}` ? "active" : ""}
            >
              <Rating caption={" e superiore"} rating={r.rating}> {r.rating} </Rating>
            </Link>
        ))}
         <Button
              className="mt-3"
              variant="contained"
              color="primary"
        onClick={(e) => {
          props.history.push(
            getFilterUrl({
              category: "all",
              name: "all",
              min: 0,
              max: 0,
              rating: "0",
              order: "newest",
            })
          );
        }}
        
      >
        Reimposta filtri di ricerca{" "}
      </Button>
            </CardContent>
          </Card>
        </Col>


        <Col md={9} className="mt-3" >
            <Card>
          <CardContent>
              {loading ? (
                <LoadingBox></LoadingBox>
              ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
              ) : (
                <Typography
                  gutterBottom
                  variant="h5"
                  id="price_product"
                  component="h2"
                >
                  {products.length} risultati
                </Typography>
              )}
              </CardContent>
              </Card>

{loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && (
            <MessageBox>
              Nessun prodotto trovato con i criteri selezionati
            </MessageBox>
          )}
          {products.map((product) => (
              <Col md={4} xs={12} id="productslist">
            <Product key={product._id} product={product}></Product>
            </Col>
          ))}
        </>
      )}
        </Col>
      </Row>
      
     
    </Container>
  );
}
