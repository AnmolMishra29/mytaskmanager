import React from "react";
import { Paper, Tab, Tabs, Typography } from "@mui/material";
import background from "../Extras/background.jpg";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import Login from "../Components/Authentication/Login";
import Signup from "../Components/Authentication/Signup";

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box>{children}</Box>}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

export const LandingPage = () => {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	return (
		<div
			style={{
				background: ` linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)),url(${background}) top left / cover no-repeat`,
				width: "100%",
				height: "100vh",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<Paper
				elevation={3}
				style={{
					width: "60%",
					marginTop: "1rem",
					borderRadius: "10px",
				}}
			>
				<Typography align="center" variant="h2">
					Task Manager
				</Typography>
			</Paper>
			<Paper
				elevation={3}
				style={{
					width: "60%",
					marginTop: "3rem",
					borderRadius: "10px",
				}}
			>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label="basic tabs example"
					variant="fullWidth"
				>
					<Tab label="LOGIN" {...a11yProps(0)} />
					<Tab label="SIGN UP" {...a11yProps(1)} />
				</Tabs>
				<TabPanel value={value} index={0}>
					<Login />
				</TabPanel>
				<TabPanel value={value} index={1}>
					<Signup />
				</TabPanel>
			</Paper>
		</div>
	);
};
