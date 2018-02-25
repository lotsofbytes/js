var webpack = require('webpack');


module.exports = {
    entry: './src/script.js',

    output: {
		filename: './dist/script.js'
    },

    module: {
		loaders: [
			{ test: /\.js$/, loader: 'babel-loader' }
		]
    }
};
