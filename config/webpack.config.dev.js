//////////
// DEV //
////////

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var paths = require('./paths');
var publicPath = '/';

module.exports = {
	
	externals: {
		createjs: 'createjs'
	},
	
	// entry point(s)
	entry: [
		require.resolve('react-dev-utils/webpackHotDevClient'),
		paths.appIndexJs
	],
	
	// output
	output: {
		path: paths.appBuild,
		pathinfo: true,
		filename: 'bundle.js',
		publicPath: publicPath
	},
	
	// module
	module: {
		rules: [
			
			// images < 10k -> base64 strings
			{
				test: /\.(png|jpg)$/,
				include: paths.appSrc,
				use: [{
					loader: 'url-loader',
					options: { limit: 10000 } 
				}]
			},
			
			// sass -> css -> <style>
			{
				test: /\.scss$/,
				include: paths.appSrc,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader']
				})
			},
			
			// es6 -> current
			{
				test: /\.js$/,
				include: paths.appSrc,
				use: [{
					loader: 'babel-loader',
					options: { presets: ['es2015'] }
				}]
			},
			
			// linter
			{
				test: /\.js$/,
				include: paths.appSrc,
				use: [{
					loader: 'eslint-loader' 
				}]
			},
		]
	},
	
	// plugins
	plugins: [
		new ExtractTextPlugin('bundle.css'),
		new webpack.NamedModulesPlugin(),
		// Generates an `index.html` file with the <script> injected.
		new HtmlWebpackPlugin({
			inject: true,
			template: paths.appHtml,
		}),
		
	],
};