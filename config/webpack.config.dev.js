//////////
// DEV //
////////

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractCSS = new ExtractTextPlugin('[name].bundle.css');

var paths = require('./paths');
var publicPath = '/';
 
module.exports = {
	
	externals: {
		//jquery: 'jquery',
		createjs: 'createjs'
	},
	
	// entry point(s)
	entry: [
		//'./src/index.js',
		require.resolve('react-dev-utils/webpackHotDevClient'),
		//require.resolve('./polyfills'),
		paths.appIndexJs
	],
	
	// output
	output: {
		path: paths.appBuild, //path: path.resolve('./', 'build'),
		pathinfo: true, //publicPath: '/',
		filename: 'static/js/bundle.js', //filename: 'bundle.js'
		publicPath: publicPath
	},
	
	// module
	module: {
		rules: [
		// images < 10k -> base64 strings
		{
			test: /\.(png|jpg)$/,
			include: path.resolve(__dirname, 'src'),
			use: [{
				loader: 'url-loader',
				options: { limit: 10000 } 
			}]
		// sass -> css -> <style>
		}, {
			test: /\.scss$/,
			include: path.resolve(__dirname, 'src'),
			loader: extractCSS.extract(['css-loader','sass-loader'])
		// es6 -> current
		}, {
			test: /\.js$/,
			include: path.resolve(__dirname, 'src'),
			use: [{
				loader: 'babel-loader',
				options: { presets: ['es2015'] }
			}]
		}]
	},
	
	// plugins
	plugins: [
		new webpack.NamedModulesPlugin(),
		// Generates an `index.html` file with the <script> injected.
		new HtmlWebpackPlugin({
			inject: true,
			template: paths.appHtml,
		}),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery"
		})
	],
};