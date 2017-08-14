//////////
// DEV //
////////

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	
	externals: {
		"createjs": "createjs"
	},
	
	devtool: 'cheap-module-eval-source-map',
	
	// entry
	// dev server settings
	// our primary js file (will require all other files to be bundled)
	entry: [
		require.resolve('react-dev-utils/webpackHotDevClient'),
		//'webpack-dev-server/client?http://localhost:8080',
		//'webpack/hot/dev-server',
		'./src/index.js'
	],
	
	// where to ouput the bundle
	output: {
		path: path.resolve('./', 'build'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	
	plugins: [
		// hot module replacement
		new webpack.HotModuleReplacementPlugin(),
		// add our bundle to this html and send to build
		new HtmlWebpackPlugin({
			template: './public/index.html'
		})
	],
	
	module: {
		// find sass files and run sass, css, and style loaders
		loaders: [
		{
			test: /\.scss$/,
  		loaders: ["style-loader", "css-loader", "sass-loader"]
		},
		{
			test: /\.css$/,
  		loaders: ["style-loader", "css-loader"]
		},
		// find js files and run babel loader
		{
			test: /\.js$/,
			loader: 'babel-loader',
			query: {
				presets: ['es2015', 'stage-2']
			},
			include: path.resolve('./', 'src'),
		}]
	},
	
	devServer: {
		contentBase: './dist',
		hot: true
	},
	
	stats: {
		colors: true
	},
	
};