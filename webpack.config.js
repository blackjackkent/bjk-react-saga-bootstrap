const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const extractCSS = new ExtractTextPlugin('[name].fonts.css');
const extractSCSS = new ExtractTextPlugin('[name].styles.css');

const BUILD_DIR = path.resolve(__dirname, 'build');
const SRC_DIR = path.resolve(__dirname, 'src');

module.exports = (env = {}) => {
	const config = require(`./config/config.${Object.keys(env)[0]}.json`);
	console.log(config);
	return {
		entry: ['babel-polyfill', `${SRC_DIR}/index.js`],
		output: {
			path: BUILD_DIR,
			publicPath: '/',
			filename: '[name].bundle.js'
		},
		// watch: true,
		devtool: env.prod ? 'source-map' : 'cheap-module-eval-source-map',
		devServer: {
			contentBase: BUILD_DIR,
			//   port: 9001,
			compress: true,
			hot: true,
			open: true,
			overlay: true
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							cacheDirectory: true,
							presets: ['react', 'env']
						}
					}
				},
				{
					test: /\.html$/,
					loader: 'html-loader'
				},
				{
					test: /\.(scss)$/,
					use: ['css-hot-loader'].concat(extractSCSS.extract({
						fallback: 'style-loader',
						use: [
							{
								loader: 'css-loader',
								options: { alias: { '../img': '../public/img' } }
							},
							{
								loader: 'sass-loader'
							}
						]
					}))
				},
				{
					test: /\.css$/,
					use: extractCSS.extract({
						fallback: 'style-loader',
						use: 'css-loader'
					})
				},
				{
					test: /\.(png|jpg|jpeg|gif|ico)$/,
					use: [
						{
							// loader: 'url-loader'
							loader: 'file-loader',
							options: {
								name: './img/[name].[hash].[ext]'
							}
						}
					]
				},
				{
					test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
					loader: 'file-loader',
					options: {
						name: './fonts/[name].[hash].[ext]'
					}
				}]
		},
		plugins: [
			new webpack.DefinePlugin({
				API_BASE_URL: JSON.stringify(config.API_BASE_URL),
				ANALYTICS_KEY: JSON.stringify(config.ANALYTICS_KEY)
			}),
			new webpack.HotModuleReplacementPlugin(),
			// new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
			new webpack.NamedModulesPlugin(),
			extractCSS,
			extractSCSS,
			new HtmlWebpackPlugin({
				inject: true,
				template: './public/index.html'
			}),
			new CopyWebpackPlugin(
				[
					{ from: './public/img', to: 'img' },
					{ from: './web.config', to: 'web.config' }
				],
				{ copyUnmodified: false }
			)
		]
	};
};
