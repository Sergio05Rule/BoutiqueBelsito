import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct, updateProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import Axios from "axios";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import { Row, Col, Dropdown, Container, Image } from "react-bootstrap/";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Form from "react-bootstrap/Form";
import TextField from "@material-ui/core/TextField";

export default function ProductEditScreen(props) {
  const productId = props.match.params.id;
  const [name, setName] = useState("");
  const [shopCode, setshopCode] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  const [sizeStockCount, setSizeStockCount] = useState("");

  const [S, setS] = useState("");
  const [M, setM] = useState("");
  const [L, setL] = useState("");
  const [XL, setXL] = useState("");
  const [XXL, setXXL] = useState("");
  const [XXXL, setXXXL] = useState("");
  const [_40, set40] = useState("");
  const [_41, set41] = useState("");
  const [_42, set42] = useState("");
  const [_43, set43] = useState("");
  const [_44, set44] = useState("");
  const [_45, set45] = useState("");
  const [_46, set46] = useState("");
  const [_47, set47] = useState("");
  const [_48, set48] = useState("");
  const [_49, set49] = useState("");
  const [_50, set50] = useState("");
  const [_51, set51] = useState("");
  const [_52, set52] = useState("");
  const [_53, set53] = useState("");
  const [_54, set54] = useState("");
  const [_55, set55] = useState("");
  const [_56, set56] = useState("");
  const [_57, set57] = useState("");
  const [_58, set58] = useState("");
  const [_59, set59] = useState("");
  const [_60, set60] = useState("");


  const [brand, setBrand] = useState("");

  const [description, setDescription] = useState("");

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      props.history.push("/productlist");
    }
    if (!product || product._id !== productId || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(productId));
    } else {
      setName(product.name);
      setshopCode(product.shopCode);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);

      product.sizeStockCount.map(
        (size) => (
          setS(size.S),
          setM(size.M),
          setL(size.L),
          setXL(size.XL),
          setXXL(size.XXL),
          setXXXL(size.XXXL),
          set40(size._40),
          set41(size._41),
          set42(size._42),
          set43(size._43),
          set44(size._44),
          set45(size._45),
          set46(size._46),
          set47(size._47),
          set48(size._48),
          set49(size._49),
          set50(size._50),
          set51(size._51),
          set52(size._52),
          set53(size._53),
          set54(size._54),
          set55(size._55),
          set56(size._56),
          set57(size._57),
          set58(size._58),
          set59(size._59),
          set60(size._60)
        )
      );
      //setS(product.sizeStockCount.S);
      setBrand(product.brand);
      setDescription(product.description);
    }
  }, [product, dispatch, productId, successUpdate, props.history]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update product
    dispatch(
      updateProduct({
        _id: productId,
        name,
        shopCode,
        price,
        image,
        category,
        brand,
        S,
        M,
        L,
        XL,
        XXL,
        XXXL,
        _40,
        _41,
        _42,
        _43,
        _44,
        _45,
        _46,
        _47,
        _48,
        _49,
        _50,
        _51,
        _52,
        _53,
        _54,
        _55,
        _56,
        _57,
        _58,
        _59,
        _60,
        description,
      })
    );
  };

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]; //upload only the first selected file
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  return (
    <Container>
      <Row>
        <Col md={2}></Col>
        <Col md={8}>
          <Card>
            <CardContent>
              <Form className="form" onSubmit={submitHandler}>
                <Typography variant="h3" component="h2">
                  Modifica prodotto n°{productId}
                </Typography>
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && (
                  <MessageBox variant="danger">{errorUpdate}</MessageBox>
                )}
                {loading ? (
                  <LoadingBox></LoadingBox>
                ) : error ? (
                  <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                  <>
                    <Form.Label className="mt-3" htmlFor="name">
                      Nome prodotto:
                    </Form.Label>
                    <Form.Control
                      id="name"
                      type="text"
                      placeholder="Inserisci nome prodotto"
                      size="lg"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    ></Form.Control>

                    <Form.Label className="mt-3" htmlFor="name">
                      Codice negozio:
                    </Form.Label>
                    <Form.Control
                      id="shopCode"
                      type="text"
                      placeholder="Inserisci codice negozio del prodotto"
                      size="lg"
                      value={shopCode}
                      onChange={(e) => setshopCode(e.target.value)}
                    ></Form.Control>

                    <Form.Label className="mt-3" htmlFor="price">
                      Prezzo (indicare centensimi con punto "."):
                    </Form.Label>
                    <Form.Control
                      id="price"
                      type="text"
                      placeholder="Inserisci prezzo del prodotto"
                      size="lg"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    ></Form.Control>
                    {/*
            <div>
              <label htmlFor="image">Directory immagine:</label>
              <input
                id="image"
                type="text"
                placeholder="Enter image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></input>
            </div>
            */}
                    <Form.Label className="mt-3" htmlFor="imageFile">
                      Carica immagine via File:
                    </Form.Label>
                    <Form.Control
                      type="file"
                      id="imageFile"
                      label="Scegli l'immagine da caricare"
                      size="lg"
                      onChange={uploadFileHandler}
                    ></Form.Control>
                    {loadingUpload && <LoadingBox></LoadingBox>}
                    {errorUpload && (
                      <MessageBox variant="danger">{errorUpload}</MessageBox>
                    )}
                    <Form.Label className="mt-3" htmlFor="category">
                      Categoria prodotto:
                    </Form.Label>
                    <Form.Control
                      id="category"
                      type="text"
                      size="lg"
                      placeholder="Enter category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    ></Form.Control>
                    <Form.Label className="mt-3" htmlFor="brand">
                      Brand:
                    </Form.Label>
                    <Form.Control
                      id="brand"
                      type="text"
                      size="lg"
                      placeholder="Enter brand"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                    ></Form.Control>

                    {/*here*/}
                    <Form.Label className="mt-3" htmlFor="sizeStockCount">
                      Quantità in magazzino per taglia S:
                    </Form.Label>
                    <Form.Control
                      id="S"
                      type="number"
                      size="lg"
                      placeholder="Inserici la quantità disponibile in magazzino per la taglia S"
                      value={S} //here
                      onChange={(e) => setS(e.target.value)}
                    ></Form.Control>

                    <Form.Label className="mt-3" htmlFor="sizeStockCount">
                      Quantità in magazzino per taglia M:
                    </Form.Label>
                    <Form.Control
                      id="M"
                      type="number"
                      size="lg"
                      placeholder="Inserici la quantità disponibile in magazzino per la taglia M"
                      value={M} //here
                      onChange={(e) => setM(e.target.value)}
                    ></Form.Control>
                    <Form.Label className="mt-3" htmlFor="sizeStockCount">
                      Quantità in magazzino per taglia L:
                    </Form.Label>
                    <Form.Control
                      id="L"
                      size="lg"
                      type="number"
                      placeholder="Inserici la quantità disponibile in magazzino per la taglia L"
                      value={L} //here
                      onChange={(e) => setL(e.target.value)}
                    ></Form.Control>
                    <Form.Label className="mt-3" htmlFor="sizeStockCount">
                      Quantità in magazzino per taglia XL:
                    </Form.Label>
                    <Form.Control
                      id="XL"
                      type="number"
                      size="lg"
                      placeholder="Inserici la quantità disponibile in magazzino per la taglia XL"
                      value={XL} //here
                      onChange={(e) => setXL(e.target.value)}
                    ></Form.Control>
                    <Form.Label className="mt-3" htmlFor="sizeStockCount">
                      Quantità in magazzino per taglia XXL:
                    </Form.Label>
                    <Form.Control
                      id="XXL"
                      type="number"
                      size="lg"
                      placeholder="Inserici la quantità disponibile in magazzino per la taglia XXL"
                      value={XXL} //here
                      onChange={(e) => setXXL(e.target.value)}
                    ></Form.Control>
                    <Form.Label className="mt-3" htmlFor="sizeStockCount">
                      Quantità in magazzino per taglia XXXL:
                    </Form.Label>
                    <Form.Control
                      id="XXXL"
                      type="number"
                      size="lg"
                      placeholder="Inserici la quantità disponibile in magazzino per la taglia XXXL"
                      value={XXXL} //here
                      onChange={(e) => setXXXL(e.target.value)}
                    ></Form.Control>

<Form.Label className="mt-3" htmlFor="sizeStockCount">
Quantità in magazzino per taglia 40:
                    </Form.Label>
                    <Form.Control
                      id="40"
                      type="number"
                      size="lg"
                      placeholder="Inserici la quantità disponibile in magazzino per la taglia 40"
                      value={_40} //here
                      onChange={(e) => set40(e.target.value)}
                    ></Form.Control>

<Form.Label className="mt-3" htmlFor="sizeStockCount">
Quantità in magazzino per taglia 41:
                    </Form.Label>
                    <Form.Control
                      id="41"
                      type="number"
                      size="lg"
                      placeholder="Inserici la quantità disponibile in magazzino per la taglia 41"
                      value={_41} //here
                      onChange={(e) => set41(e.target.value)}
                    ></Form.Control>

<Form.Label className="mt-3" htmlFor="sizeStockCount">
Quantità in magazzino per taglia 42:
                    </Form.Label>
                    <Form.Control
                      id="42"
                      type="number"
                      size="lg"
                      placeholder="Inserici la quantità disponibile in magazzino per la taglia 42"
                      value={_42} //here
                      onChange={(e) => set42(e.target.value)}
                    ></Form.Control>

<Form.Label className="mt-3" htmlFor="sizeStockCount">
Quantità in magazzino per taglia 43:
                    </Form.Label>
                    <Form.Control
                      id="43"
                      type="number"
                      size="lg"
                      placeholder="Inserici la quantità disponibile in magazzino per la taglia 43"
                      value={_43} //here
                      onChange={(e) => set43(e.target.value)}
                    ></Form.Control>

<Form.Label className="mt-3" htmlFor="sizeStockCount">
Quantità in magazzino per taglia 44:
                    </Form.Label>
                    <Form.Control
                      id="44"
                      type="number"
                      size="lg"
                      placeholder="Inserici la quantità disponibile in magazzino per la taglia 44"
                      value={_44} //here
                      onChange={(e) => set44(e.target.value)}
                    ></Form.Control>

<Form.Label className="mt-3" htmlFor="sizeStockCount">
Quantità in magazzino per taglia 45:
                    </Form.Label>
                    <Form.Control
                      id="45"
                      type="number"
                      size="lg"
                      placeholder="Inserici la quantità disponibile in magazzino per la taglia 45"
                      value={_45} //here
                      onChange={(e) => set45(e.target.value)}
                    ></Form.Control>

<Form.Label className="mt-3" htmlFor="sizeStockCount">
Quantità in magazzino per taglia 46:
                    </Form.Label>
                    <Form.Control
                      id="46"
                      type="number"
                      size="lg"
                      placeholder="Inserici la quantità disponibile in magazzino per la taglia 46"
                      value={_46} //here
                      onChange={(e) => set46(e.target.value)}
                    ></Form.Control>

<Form.Label className="mt-3" htmlFor="sizeStockCount">
Quantità in magazzino per taglia 47:
                    </Form.Label>
                    <Form.Control
                      id="47"
                      type="number"
                      size="lg"
                      placeholder="Inserici la quantità disponibile in magazzino per la taglia 47"
                      value={_47} //here
                      onChange={(e) => set47(e.target.value)}
                    ></Form.Control>

<Form.Label className="mt-3" htmlFor="sizeStockCount">
Quantità in magazzino per taglia 48:
                    </Form.Label>
                    <Form.Control
                      id="48"
                      type="number"
                      size="lg"
                      placeholder="Inserici la quantità disponibile in magazzino per la taglia 48"
                      value={_48} //here
                      onChange={(e) => set48(e.target.value)}
                    ></Form.Control>

<Form.Label className="mt-3" htmlFor="sizeStockCount">
Quantità in magazzino per taglia 49:
                    </Form.Label>
                    <Form.Control
                      id="49"
                      type="number"
                      size="lg"
                      placeholder="Inserici la quantità disponibile in magazzino per la taglia 49"
                      value={_49} //here
                      onChange={(e) => set49(e.target.value)}
                    ></Form.Control>


                    <Form.Label className="mt-3" htmlFor="sizeStockCount">
                      Quantità in magazzino per taglia 50:
                    </Form.Label>
                    <Form.Control
                      id="50"
                      type="number"
                      size="lg"
                      placeholder="Inserici la quantità disponibile in magazzino per la taglia 50"
                      value={_50} //here
                      onChange={(e) => set50(e.target.value)}
                    ></Form.Control>

                    <Form.Label className="mt-3" htmlFor="sizeStockCount">
                      Quantità in magazzino per taglia 51:
                    </Form.Label>
                    <Form.Control
                      id="51"
                      type="number"
                      size="lg"
                      placeholder="Inserici la quantità disponibile in magazzino per la taglia 51"
                      value={_51} //here
                      onChange={(e) => set51(e.target.value)}
                    ></Form.Control>

                    <Form.Label className="mt-3" htmlFor="sizeStockCount">
                      Quantità in magazzino per taglia 52:
                    </Form.Label>
                    <Form.Control
                      id="52"
                      type="number"
                      size="lg"
                      placeholder="Inserici la quantità disponibile in magazzino per la taglia 52"
                      value={_52} //here
                      onChange={(e) => set52(e.target.value)}
                    ></Form.Control>

                    <Form.Label className="mt-3" htmlFor="sizeStockCount">
                      Quantità in magazzino per taglia 53:
                    </Form.Label>
                    <Form.Control
                      id="53"
                      type="number"
                      size="lg"
                      placeholder="Inserici la quantità disponibile in magazzino per la taglia 53"
                      value={_53} //here
                      onChange={(e) => set53(e.target.value)}
                    ></Form.Control>


<Form.Label className="mt-3" htmlFor="sizeStockCount">
                      Quantità in magazzino per taglia 54:
                    </Form.Label>
                    <Form.Control
                      id="54"
                      type="number"
                      size="lg"
                      placeholder="Inserici la quantità disponibile in magazzino per la taglia 54"
                      value={_54} //here
                      onChange={(e) => set54(e.target.value)}
                    ></Form.Control>


<Form.Label className="mt-3" htmlFor="sizeStockCount">
                      Quantità in magazzino per taglia 55:
                    </Form.Label>
                    <Form.Control
                      id="55"
                      type="number"
                      size="lg"
                      placeholder="Inserici la quantità disponibile in magazzino per la taglia 55"
                      value={_55} //here
                      onChange={(e) => set55(e.target.value)}
                    ></Form.Control>


<Form.Label className="mt-3" htmlFor="sizeStockCount">
                      Quantità in magazzino per taglia 56:
                    </Form.Label>
                    <Form.Control
                      id="56"
                      type="number"
                      size="lg"
                      placeholder="Inserici la quantità disponibile in magazzino per la taglia 56"
                      value={_56} //here
                      onChange={(e) => set56(e.target.value)}
                    ></Form.Control>

<Form.Label className="mt-3" htmlFor="sizeStockCount">
                      Quantità in magazzino per taglia 57:
                    </Form.Label>
                    <Form.Control
                      id="57"
                      type="number"
                      size="lg"
                      placeholder="Inserici la quantità disponibile in magazzino per la taglia 57"
                      value={_57} //here
                      onChange={(e) => set57(e.target.value)}
                    ></Form.Control>

<Form.Label className="mt-3" htmlFor="sizeStockCount">
                      Quantità in magazzino per taglia 58:
                    </Form.Label>
                    <Form.Control
                      id="58"
                      type="number"
                      size="lg"
                      placeholder="Inserici la quantità disponibile in magazzino per la taglia 58"
                      value={_58} //here
                      onChange={(e) => set58(e.target.value)}
                    ></Form.Control>

<Form.Label className="mt-3" htmlFor="sizeStockCount">
                      Quantità in magazzino per taglia 59:
                    </Form.Label>
                    <Form.Control
                      id="59"
                      type="number"
                      size="lg"
                      placeholder="Inserici la quantità disponibile in magazzino per la taglia 59"
                      value={_59} //here
                      onChange={(e) => set59(e.target.value)}
                    ></Form.Control>

<Form.Label className="mt-3" htmlFor="sizeStockCount">
                      Quantità in magazzino per taglia 60:
                    </Form.Label>
                    <Form.Control
                      id="60"
                      type="number"
                      size="lg"
                      placeholder="Inserici la quantità disponibile in magazzino per la taglia 60"
                      value={_60} //here
                      onChange={(e) => set60(e.target.value)}
                    ></Form.Control>

                    <Form.Label htmlFor="description" className="mt-3">
                      Descrizione prodotto:
                    </Form.Label>
                    <TextField
                      id="description"
                      rows={10}
                      type="text"
                      placeholder="Enter description"
                      className="w-100"
                      value={description}
                      variant="outlined"
                      onChange={(e) => setDescription(e.target.value)}
                    ></TextField>
                    <Button
                      color="primary"
                      className="w-100 mt-3"
                      variant="contained"
                      type="submit"
                    >
                      Aggiorna prodotto
                    </Button>
                  </>
                )}
              </Form>
            </CardContent>
          </Card>
        </Col>
        <Col md={2}></Col>
      </Row>
    </Container>
  );
}
