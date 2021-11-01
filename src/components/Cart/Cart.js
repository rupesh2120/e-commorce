import React from "react";
import GooglePayButton from "@google-pay/button-react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

import CartItem from "./CartItem/CartItem";
import useStyles from "./styles";

const Cart = ({ cart, onUpdateCartQty, onRemoveFromCart, onEmptyCart }) => {
	const classes = useStyles();

	const handleEmptyCart = () => onEmptyCart();

	const renderEmptyCart = () => (
		<Typography variant="subtitle1">
			You have no items in your shopping cart,
			<Link className={classes.link} to="/">
				start adding some
			</Link>
			!
		</Typography>
	);

	if (!cart.line_items) return "Loading";

	const renderCart = () => (
		<>
			<Grid container spacing={3}>
				{cart.line_items.map((lineItem) => (
					<Grid item xs={12} sm={4} key={lineItem.id}>
						<CartItem
							item={lineItem}
							onUpdateCartQty={onUpdateCartQty}
							onRemoveFromCart={onRemoveFromCart}
						/>
					</Grid>
				))}
			</Grid>
			<div className={classes.cardDetails}>
				<Typography variant="h4">
					Subtotal: {cart.subtotal.formatted_with_symbol}
				</Typography>
				<div>
					<Button
						className={classes.emptyButton}
						size="large"
						type="button"
						variant="contained"
						color="secondary"
						onClick={handleEmptyCart}
					>
						Empty cart
					</Button>
					<GooglePayButton
						environment="TEST"
						buttonColor="black"
						buttonType="checkout"
						paymentRequest={{
							apiVersion: 2,
							apiVersionMinor: 0,
							allowedPaymentMethods: [
								{
									type: "CARD",
									parameters: {
										allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
										allowedCardNetworks: ["MASTERCARD", "VISA"],
									},
									tokenizationSpecification: {
										type: "PAYMENT_GATEWAY",
										parameters: {
											gateway: "example",
											gatewayMerchantId: "exampleGatewayMerchantId",
										},
									},
								},
							],
							merchantInfo: {
								merchantId: "12345678901234567890",
								merchantName: "Demo Merchant",
							},
							transactionInfo: {
								totalPriceStatus: "FINAL",
								totalPriceLabel: "Total",
								totalPrice: "100.00",
								currencyCode: "USD",
								countryCode: "US",
							},
						}}
						onLoadPaymentData={(paymentRequest) => {
							console.log("load payment data", paymentRequest);
						}}
					/>
				</div>
			</div>
		</>
	);

	return (
		<Container>
			<div className={classes.toolbar} />
			<Typography className={classes.title} variant="h3" gutterBottom>
				Your Shopping Cart
			</Typography>
			{!cart.line_items.length ? renderEmptyCart() : renderCart()}
		</Container>
	);
};

export default Cart;
