///////////
// PROD //
/////////

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
var paths = require('./paths');
var publicPath = '';
 
module.exports = {
	
	externals: {
		//jquery: 'jquery',
		createjs: 'createjs'
	},
	
	// entry point(s)
	entry: [
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
						//resolve-url-loader may be chained before sass-loader if necessary
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
			}
			
		]
	},
	
	// plugins
	plugins: [
		new ExtractTextPlugin('bundle.css'),
		// Generates an `index.html` file with the <script> injected.
		new HtmlWebpackPlugin({
			inject: true,
			template: paths.appHtml,
			minify: {
				removeComments: true,
				collapseWhitespace: false,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			}
		}),
		// Try to dedupe duplicated modules, if any:
		new webpack.optimize.DedupePlugin(),
		// Minify the code.
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				screw_ie8: true, // React doesn't support IE8
				warnings: false
			},
			mangle: {
				screw_ie8: true
			},
			output: {
				comments: false,
				screw_ie8: true
			}
		}),
		// Generate a manifest file which contains a mapping of all asset filenames
		// to their corresponding output file so that tools can pick it up without
		// having to parse `index.html`.
		new ManifestPlugin({
			fileName: 'asset-manifest.json'
		}),
	],
	// Some libraries import Node modules but don't use them in the browser.
	// Tell Webpack to provide empty mocks for them so importing them works.
	node: {
		fs: 'empty',
		net: 'empty',
		tls: 'empty'
	}
};