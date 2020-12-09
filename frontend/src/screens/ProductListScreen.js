import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    createProduct,
    deleteProduct,
    listProducts,
  } from '../actions/productActions';import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import {
    PRODUCT_CREATE_RESET,
    PRODUCT_DELETE_RESET,
  } from '../constants/productConstants';

export default function ProductListScreen(props) {
  const sellerMode = props.match.path.indexOf('/seller') >= 0; //Add
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
        dispatch({ type: PRODUCT_CREATE_RESET });
        props.history.push(`/product/${createdProduct._id}/edit`);
    }
    if (successDelete) {
        dispatch({ type: PRODUCT_DELETE_RESET });
        ;
    }
    dispatch(listProducts({ seller: sellerMode ? userInfo._id : '' }));
    }, [
      createdProduct,
      dispatch,
      props.history,
      sellerMode,
      successCreate,
      successDelete,
      userInfo._id,
    ]);

  const deleteHandler = (product) => {
    if (window.confirm('Sei sicuro di voler cancellare definitivamente il prodotto dal negozio?')) {
     dispatch(deleteProduct(product._id));
     dispatch(listProducts({ seller: sellerMode ? userInfo._id : '' }));
    }
  };
  const createHandler = () => {
    dispatch(createProduct());
  };
  return (
    <div>
        <div className="row">
            <h1>Pannello di amministrazione prodotti</h1>
            <button type="button" className="primary" onClick={createHandler}>
            Crea prodotto
            </button>
        </div>

        {loadingDelete && <LoadingBox></LoadingBox>}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
        {successDelete && (
        <MessageBox variant="success">Prodotto eliminato correttamente</MessageBox>
        )}
        {loadingCreate && <LoadingBox></LoadingBox>}
        {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
        {loading ? (
            <LoadingBox></LoadingBox>
        ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
        ) : (
            <table className="table">
            <thead>
                <tr>
                <th>Numero prodotto:</th>
                <th>Nome prodotto</th>
                <th>Codice negozio</th>
                <th>Prezzo</th>
                <th>Categoria</th>
                <th>Brand</th>
                <th>Azioni</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.shopCode}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                    <button
                        type="button"
                        className="small"
                        onClick={() =>
                        props.history.push(`/product/${product._id}/edit`)
                        }
                    >
                        Modifica
                    </button>
                    <button
                        type="button"
                        className="small"
                        onClick={() => deleteHandler(product)}
                    >
                        Cancella
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        )}    
    </div>
    );
    }