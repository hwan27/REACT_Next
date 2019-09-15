import React from "react";
import Head from "next/head";
import AppLayout from "../components/AppLayout";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import reducer from "../reducers";
import withRedux from "next-redux-wrapper";
import { createStore } from "redux";

const NodeBird = ({ Component, store }) => {
	return (
		<Provider store={store}>
			<Head>
				<title>NodeBird</title>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.18.1/antd.css"
				/>
			</Head>
			<AppLayout>
				<Component />
			</AppLayout>
		</Provider>
	);
};

NodeBird.propTypes = {
	Component: PropTypes.elementType,
	store: PropTypes.object
};
export default withRedux((initialState, options) => {
	const store = createStore(reducer, initialState);
	//store 커스터마이징
	return store;
})(NodeBird);
