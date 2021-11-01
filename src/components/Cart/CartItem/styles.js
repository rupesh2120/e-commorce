import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
	media: {
		//height: 260,
		height: 250,
		width: "33%",
		marginLeft: "33%",
	},
	cardContent: {
		display: "flex",
		justifyContent: "space-between",
	},
	cartActions: {
		justifyContent: "space-between",
	},
	buttons: {
		display: "flex",
		alignItems: "center",
	},
}));
