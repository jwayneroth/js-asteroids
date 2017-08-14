var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	
	externals: {
		"createjs": "createjs"
	},
	
	devtool: 'source-map',
	
	// our primary js file (will require all other files to be bundled)
	entry: './src/index.js',
	
	// where to ouput the bundle
	output: {
		path: path.resolve('./', 'build'),
		filename: 'bundle.js'
	},
	
	plugins: [
		// minify bundle
		/*new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false,
			},
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),*/
		// add our bundle to this html and send to build
		new HtmlWebpackPlugin({
			template: './public/index.html'
		}),
		new ExtractTextPlugin("styles.css"),
	],
	
	module: {
		// find sass files and run sass, css, and style loaders
		loaders: [
		{
			test: /\.scss$/,
  		loader: ExtractTextPlugin.extract({
				use: [{
						loader: "css-loader"
				}, {
						loader: "sass-loader"
				}],
				fallback: "style-loader"
			})
		},
		{
			test: /\.css$/,
  		loader: ExtractTextPlugin.extract({
				use: [{
						loader: "css-loader"
				}, {
						loader: "sass-loader"
				}],
				fallback: "style-loader"
			})
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
	
	stats: {
		colors: true
	},
};