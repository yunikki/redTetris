const webpack = require("webpack");
const path = require("path");
const HTMLPlug = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");


let config = {
    entry: "./src/client/index.js",
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "./bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: [
                    'css-hot-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ]
            },

        ]
    },
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    plugins: [
        new UglifyJSPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new HTMLPlug({
            template: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, "./public"),
        historyApiFallback: true,
        inline: true,
        open: false,
        hot: true,
        port: 3000
    },
    // devtool: "eval-source-map"
}

module.exports = config;
