import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import '../scss/style.scss';
import history from './utility/history';
import withPageViewTracker from './infrastructure/withPageViewTracker';
import Dashboard from './display/containers/Dashboard';
import Login from './display/containers/Login';

const propTypes = {
};

function mapStateToProps(state) {
	return state;
}

const App = () => (
	<Router history={history}>
		<Switch>
			<Route
				path="/dashboard"
				name="Dashboard"
				component={withPageViewTracker(Dashboard)}
			/>
			<Route
				path="/login"
				name="Login"
				component={withPageViewTracker(Login)}
			/>
			<Redirect from="/" to="/login" />
		</Switch>
	</Router>
);
App.propTypes = propTypes;
export default connect(mapStateToProps)(App);
