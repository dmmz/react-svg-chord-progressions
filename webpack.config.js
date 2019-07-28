const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, "example/src/index.html"),
    filename: "./index.html"
});
module.exports = {
    entry: './example/src/index.js',
    plugins: [
        htmlWebpackPlugin
    ],
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: 'babel-loader',
            exclude: /node_modules/
        },
        {
             test: /\.css$/,
             use: [
               'style-loader',
               'css-loader'
             ]
        }, 
        { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
        ]
    },
    devServer:{
        port: 3001
    } 
};
