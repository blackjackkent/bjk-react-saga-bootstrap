import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import GoogleAnalytics from 'react-ga';

if (ANALYTICS_KEY) {
	GoogleAnalytics.initialize('analytics-key');
}

const withPageViewTracker = (WrappedComponent, options = {}) => {
	const propTypes = {
		location: PropTypes.shape({
			pathname: PropTypes.string
		}).isRequired
	};
	const trackPage = (page) => {
		if (!ANALYTICS_KEY) {
			return;
		}
		GoogleAnalytics.set({
			page,
			...options
		});
		GoogleAnalytics.pageview(page);
	};

	const HOC = class extends PureComponent {
		componentDidMount() {
			const page = this.props.location.pathname;
			trackPage(page);
		}

		componentWillReceiveProps(nextProps) {
			const currentPage = this.props.location.pathname;
			const nextPage = nextProps.location.pathname;

			if (currentPage !== nextPage) {
				trackPage(nextPage);
			}
		}

		render() {
			return <WrappedComponent {...this.props} />;
		}
	};
	HOC.propTypes = propTypes;
	return HOC;
};

export default withPageViewTracker;
