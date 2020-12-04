import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import {
	ListItem,
	Drawer,
	Divider,
	IconButton
} from "@material-ui/core";
import { TiChevronLeftOutline } from "react-icons/ti";
import { listProductCategories } from "../../../actions/productActions";
import MessageBox from '../../MessageBox';
import LoadingBox from '../../LoadingBox';

const DrawerBasic = props => {
    const dispatch = useDispatch();

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
			ModalProps={{ onBackdropClick: notifyDrawerClose }}
			variant="temporary"
			anchor="left"
			open={props.openSidebar}
		>
			<div>
				<IconButton id="buttonChevron" onClick={notifyDrawerClose}>
					<TiChevronLeftOutline />
				</IconButton>
			</div>
			<h2 className="text-center">Categorie : </h2>
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
							<ListItem 
								to={`/search/category/${c}`}
								component={Link}
							>
								{c}
							</ListItem>
							)
						)
				)
			}
		</Drawer>
	);
};

export default DrawerBasic;
