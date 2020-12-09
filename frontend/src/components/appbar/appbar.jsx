import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {
	IconButton,
	AppBar,
	Toolbar,
	Button,
	Tooltip,
	Icon,
	Badge
} from '@material-ui/core';
import DrawerBasic from "./drawerBasic/drawerBasic";
import { IconContext } from "react-icons";
import { FiMenu } from "react-icons/fi";
import {Row, Col, Dropdown, Container} from "react-bootstrap/";
import { Link, Route } from 'react-router-dom';
import SearchBox from './SearchBox';
import { signout } from '../../actions/userActions';

const Aside = props => {

	//Mine
	const cart = useSelector((state) => state.cart);
    const {cartItems} = cart;
    const userSignin = useSelector((state) => state.userSignin)
    const {userInfo} = userSignin;
    const dispatch = useDispatch();
    const signoutHandler = () =>{
        dispatch(signout());
    }

	const [openSidebar, setOpenSidebar] = useState(false);
	const handleDrawerOpen = () => {
		setOpenSidebar(true);
	};
	const handleDrawerClose = () => {
		setOpenSidebar(false);
	};

	return (
		<AppBar id="appbar" position="fixed">
			<Row>	
				<Col md={3}>
				</Col>
				<Col md={6}>
					<Row className="justify-content-start">
					<Col md={3} >
					<Link className="brand" to="/">Boutique Belsito</Link>
					</Col>
					<Col >
					<Route
					render={({ history }) => (
						<SearchBox history={history}></SearchBox>
					)}
					></Route>
					</Col>
					</Row>
				</Col>

				<Col className="navigation" md={3}>
					<Row>
						<Toolbar>
						<Link className="fa-shopping-cart" to="/cart" >
							<Badge badgeContent={cartItems.length} color="secondary"  id="badge">
									<i className="fa fa-shopping-cart"  style={{'fontSize' : '3.5rem'}}></i>
							</Badge>
						</Link>
						<IconContext.Provider
      							value={{ color: 'white', size: '20px' }}>
								  <FiMenu
								  className="ml-4"
								onClick={handleDrawerOpen}/>
    					</IconContext.Provider>
						</Toolbar> 
						<DrawerBasic
						className="mr-2"
						openSidebar={openSidebar}
						onCloseDrawer={handleDrawerClose}
						/>
					</Row>
				</Col>
			</Row>
		</AppBar>
	);
};

export default Aside;