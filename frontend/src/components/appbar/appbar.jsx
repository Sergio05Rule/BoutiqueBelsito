import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {
	IconButton,
	AppBar,
	Toolbar,
	Button,
	Tooltip,
	Icon
} from '@material-ui/core';
import DrawerBasic from "./drawerBasic/drawerBasic";
import { FiMenu } from "react-icons/fi";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
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
		<AppBar id="appbarTodo" position="fixed">
			<Row>
				<Col md={4} >
					<Toolbar>
						<IconButton
							color="inherit"
							onClick={handleDrawerOpen}
						>
							<FiMenu />
						</IconButton>
						<Link className="brand" to="/">Boutique Belsito</Link>
					</Toolbar>
					<DrawerBasic
					openSidebar={openSidebar}
					onCloseDrawer={handleDrawerClose}
					/>
				</Col>
				
				<Col md={4} >
					<Route
					render={({ history }) => (
						<SearchBox history={history}></SearchBox>
					)}
					></Route>
				</Col>

				<Col md={4} >
					<div className="text-right">
					<Link to="/cart" >
								<i className="fa fa-shopping-cart" style={{'fontSize' : '3rem'}}></i>
								{cartItems.length > 0 && (
									<span className="badge">{cartItems.length}</span>
							)}
					</Link>
					{userInfo ? (
									<div className="dropdown ml-2 mr-2">
										<Link to="#" >
											{userInfo.name} <i className="fa fa-caret-down"></i>{' '}
										</Link>
										<ul className="dropdown-content">
											<li>
											<Link to="/profile">User Profile</Link>
											</li>
											<li>
												<Link to="/orderhistory">Order History</Link>
											</li>
											<li>
											<Link to="#signout" onClick={signoutHandler} >
												SignOut
											</Link>
											</li>
										</ul>
									</div>
								) : (
										<Link className="ml-2 mr-2" to="/signin">Sign In</Link>
								)}
								{userInfo && userInfo.isAdmin && (
									<div className="dropdown">
										<Link to="#admin">
										Admin <i className="fa fa-caret-down"></i>
										</Link>
										<ul className="dropdown-content">
										<li>
											<Link to="/dashboard">Dashboard</Link>
										</li>
										<li>
											<Link to="/productlist">Products</Link>
										</li>
										<li>
											<Link to="/orderlist">Orders</Link>
										</li>
										<li>
											<Link to="/userlist">Users</Link>
										</li>
										</ul>
									</div>
								)}
						</div>
				</Col>
			</Row>
		</AppBar>
	);
};

export default Aside;