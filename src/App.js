import React, { useState, useEffect } from "react";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Navbar, Products, Cart } from "./components";
import { commerce } from "./lib/commerce";

const App = () => {
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState({});
	const [order, setOrder] = useState({});
	const [errorMessage, setErrorMessage] = useState("");

	const fetchProducts = async () => {
		const { data } = await commerce.products.list();

		setProducts(data);
	};

	const fetchCart = async () => {
		setCart(await commerce.cart.retrieve());
	};

	const handleAddToCart = async (productId, quantity) => {
		const item = await commerce.cart.add(productId, quantity);

		setCart(item.cart);
	};

	const handleUpdateCartQty = async (lineItemId, quantity) => {
		const response = await commerce.cart.update(lineItemId, { quantity });

		setCart(response.cart);
	};

	const handleRemoveFromCart = async (lineItemId) => {
		const response = await commerce.cart.remove(lineItemId);

		setCart(response.cart);
	};

	const handleEmptyCart = async () => {
		const response = await commerce.cart.empty();

		setCart(response.cart);
	};

	const refreshCart = async () => {
		const newCart = await commerce.cart.refresh();

		setCart(newCart);
	};

	useEffect(() => {
		fetchProducts();
		fetchCart();
	}, []);

	console.log(products);

	const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

	return (
		<Router>
			<div style={{ display: "flex" }}>
				<CssBaseline />
				<Navbar
					totalItems={cart.total_items}
					handleDrawerToggle={handleDrawerToggle}
				/>
				<Switch>
					<Route exact path="/">
						<Products
							products={products}
							onAddToCart={handleAddToCart}
							handleUpdateCartQty
						/>
					</Route>
					<Route exact path="/cart">
						<Cart
							cart={cart}
							onUpdateCartQty={handleUpdateCartQty}
							onRemoveFromCart={handleRemoveFromCart}
							onEmptyCart={handleEmptyCart}
						/>
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default App;
