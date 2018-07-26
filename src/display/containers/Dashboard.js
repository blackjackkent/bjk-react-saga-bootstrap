// #region imports
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// #endregion imports

const propTypes = {
};

const mapStateToProps = state => state;
const Dashboard = () => (
	<div>
		Dashboard Page (Link to <Link href="/login" to="/login">Login</Link>)
	</div>
);

Dashboard.propTypes = propTypes;
export default connect(mapStateToProps)(Dashboard);
