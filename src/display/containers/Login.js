// #region imports
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// #endregion imports

const propTypes = {
};
const mapStateToProps = state => state;
const Login = () => (
	<div>
		Login Page (Link to <Link href="/dashboard" to="/dashboard">Dashboard</Link>)
	</div>
);

Login.propTypes = propTypes;
export default connect(mapStateToProps)(Login);
