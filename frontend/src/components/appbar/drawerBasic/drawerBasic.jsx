import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ListItem,
  ListItemText,
  Drawer,
  Divider,
  IconButton,
} from "@material-ui/core";
import { TiChevronRightOutline } from "react-icons/ti";
import { listProductCategories } from "../../../actions/productActions";
import MessageBox from "../../MessageBox";
import LoadingBox from "../../LoadingBox";
import { signout } from "../../../actions/userActions";
import { Row, Col, Dropdown, Container } from "react-bootstrap/";
import { IconContext } from "react-icons";

const DrawerBasic = (props) => {
  const dispatch = useDispatch();

  // mine: move sign in to drawer
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const signoutHandler = () => {
    dispatch(signout());
  };

  const notifyDrawerClose = () => {
    props.onCloseDrawer(false);
  };

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);

  return (
    <Drawer
      //Modalprops permette la chiusura del Drawer sul click ovunque fuori da esso.
      ModalProps={{ onBackdropClick: notifyDrawerClose, onClick: notifyDrawerClose}}
      variant="temporary"
      anchor="right"
      open={props.openSidebar}
    >
      
      {userInfo ? (
        <>
		<h2 className="text-center">Ciao {userInfo.name}</h2>
		<Divider light={true} />
		<ListItem button component={Link} to={`/profile`}>
		  <ListItemText className="listItem">Modifica il tuo profilo</ListItemText>
		</ListItem>
		<ListItem button component={Link} to={`/orderhistory`}>
		  <ListItemText className="listItem">Storico ordini</ListItemText>
		</ListItem>
		<ListItem button component={Link} to="#signout" onClick={signoutHandler}>
		  <ListItemText className="listItem">Esci</ListItemText>
		</ListItem>
		<br></br>
		</>
      ) : (
		  <>
		<h2 className="text-center">Accedi o registrati</h2>
		<Divider light={true} />
		<ListItem button component={Link} to="/signin">
		<ListItemText className="listItem">Accedi</ListItemText>
	  	</ListItem>
		  <ListItem button component={Link} to="/register">
		<ListItemText className="listItem">Registrati</ListItemText>
	  	</ListItem>
		<br></br>
	  </>
      )}
      {userInfo && userInfo.isAdmin && (
        <>
          <h2 className="text-center">Amministrazione</h2>
          <Divider light={true} />
          <ListItem button component={Link}>
            <ListItemText to={`/dashboard`} className="listItem">
              Dashboard
            </ListItemText>
          </ListItem>
          <ListItem button component={Link} to={`/productlist`}>
            <ListItemText className="listItem">Gestione prodotti</ListItemText>
          </ListItem>
          <ListItem button component={Link} to={`/orderlist`}>
            <ListItemText className="listItem">Gestione ordini</ListItemText>
          </ListItem>
          <ListItem button component={Link} to={`/userlist`}>
            <ListItemText className="listItem">Gestione utenti</ListItemText>
          </ListItem>
		<br></br>
        </>
      )}

<h2 className="text-center">Chi Siamo</h2>
          <Divider light={true} />
          <ListItem button component={Link} to={`/BiographyScreen`}>
            <ListItemText className="listItem">Biografia</ListItemText>
          </ListItem>
          <ListItem button component={Link} to={`/DetailsScreen`}>
            <ListItemText className="listItem">Eleganza & Qualità</ListItemText>
          </ListItem>
		<br></br>

      <h2 className="text-center">Categorie</h2>
      <Divider light={true} />
      {loadingCategories ? (
        <LoadingBox></LoadingBox>
      ) : errorCategories ? (
        <MessageBox variant="danger">{errorCategories}</MessageBox>
      ) : (
        categories.map((c) => (
          /*<List key={c}>
                            <Link
                                to={`/search/category/${c}`}
                                onClick={() => notifyDrawerClose()}
                            >
                                {c}
                            </Link>
							</List>*/
          <ListItem button to={`/search/category/${c}`} component={Link}>
            <ListItemText className="listItem">{c}</ListItemText>
          </ListItem>
        ))
      )}
	
		
    </Drawer>
  );
};

export default DrawerBasic;
