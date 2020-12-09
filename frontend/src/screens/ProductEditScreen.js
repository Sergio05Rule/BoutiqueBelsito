import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct, updateProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
import Axios from 'axios';

export default function ProductEditScreen(props) {
  const productId = props.match.params.id;
  const [name, setName] = useState('');
  const [shopCode, setshopCode] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');

  const [S, setS] = useState('');
  const [M, setM] = useState('');
  const [L, setL] = useState('');
  const [XL, setXL] = useState('');
  const [XXL, setXXL] = useState('');
  const [XXXL, setXXXL] = useState('');
  const [brand, setBrand] = useState('');

  const [description, setDescription] = useState('');

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
        props.history.push('/productlist');
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
      product.sizeStockCount.map((size) => (
          setS(size.S),
          setM(size.M),
          setL(size.L),
          setXL(size.XL),
          setXXL(size.XXL),
          setXXXL(size.XXXL)
      ))
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
        description,
        })
    );  
  };

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]; //upload only the first selected file
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
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
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Modifica prodotto n°{productId}</h1>
        </div>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Nome prodotto:</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="name">Codice negozio:</label>
              <input
                id="shopCode"
                type="text"
                placeholder="Enter Shop Code"
                value={shopCode}
                onChange={(e) => setshopCode(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="price">Prezzo (indicare centensimi con punto "."):</label>
              <input
                id="price"
                type="text"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></input>
            </div>
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
            <div>
              <label htmlFor="imageFile">Carica immagine via File:</label>
              <input
                type="file"
                id="imageFile"
                label="Choose Image"
                onChange={uploadFileHandler}
              ></input>
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}
            </div>
            <div>
              <label htmlFor="category">Categoria prodotto:</label>
              <input
                id="category"
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="brand">Brand:</label>
              <input
                id="brand"
                type="text"
                placeholder="Enter brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></input>
            </div>
            <div>
            <label htmlFor="sizeStockCount">Numero in magazzino per taglia S:</label>
              <input
                id="S"
                type="number"
                placeholder="Enter S Size Count in Stock"
                value={S} //here
                onChange={(e) => setS(e.target.value)}
              ></input>
            </div>
            <div>
            <label htmlFor="sizeStockCount">Numero in magazzino per taglia M:</label>
              <input
                id="M"
                type="number"
                placeholder="Enter M Size Count in Stock"
                value={M} //here
                onChange={(e) => setM(e.target.value)}
              ></input>
            </div>
            <div>
            <label htmlFor="sizeStockCount">Numero in magazzino per taglia L:</label>
              <input
                id="L"
                type="number"
                placeholder="Enter L Size Count in Stock"
                value={L} //here
                onChange={(e) => setL(e.target.value)}
              ></input>
            </div>
            <div>
            <label htmlFor="sizeStockCount">Numero in magazzino per taglia XL:</label>
              <input
                id="XL"
                type="number"
                placeholder="Enter XL Size Count in Stock"
                value={XL} //here
                onChange={(e) => setXL(e.target.value)}
              ></input>
            </div>
            <div>
            <label htmlFor="sizeStockCount">Numero in magazzino per taglia XXL:</label>
              <input
                id="XXL"
                type="number"
                placeholder="Enter XXL Size Count in Stock"
                value={XXL} //here
                onChange={(e) => setXXL(e.target.value)}
              ></input>
            </div>
            <div>
            <label htmlFor="sizeStockCount">Numero in magazzino per taglia XXXL:</label>
              <input
                id="XXXL"
                type="number"
                placeholder="Enter XXL Size Count in Stock"
                value={XXXL} //here
                onChange={(e) => setXXXL(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="description">Descrizione prodotto:</label>
              <textarea
                id="description"
                rows="3"
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label></label>
              <button className="primary" type="submit">
                Aggiorna prodotto
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}