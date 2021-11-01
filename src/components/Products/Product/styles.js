import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
	root: {
		// maxWidth: 345, original width style
		maxWidth: "100%",
	},
	media: {
		// height: 0,
		// paddingTop: "56.25%", // 16:9
		height: 250,
		width: "63%",
		marginLeft: "23%",
	},
	cardActions: {
		display: "flex",
		justifyContent: "flex-end",
	},
	cardContent: {
		display: "flex",
		justifyContent: "space-between",
	},
}));
