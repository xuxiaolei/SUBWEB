const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CSSMinimizerPlugin = require('css-minimizer-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require('webpack'); // 导入 webpack
require('dotenv').config(); // 加载 .env 文件
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "./js/[name].js"
    },
    mode: process.env.NODE_ENV,
    // devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node-moudles/
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, {
                    loader: "css-loader",
                    options: {
                        url: false
                    }
                }],
                exclude: /node-moudles/
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            url: false
                        }
                    },
                    "less-loader"
                ],
                exclude: /node-moudles/
            }
        ]
    },
    plugins: [
        // new BundleAnalyzerPlugin(),
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: "./public/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].css"
        }),
        new CSSMinimizerPlugin(),
        new NodePolyfillPlugin(),
        new CopyPlugin({
            patterns: [
                { from: "public/favicon.ico", to: "favicon.ico" },
                { from: "public/js/jquery.min.js", to: "js/jquery.min.js" },
                { from: "public/js/layui.js", to: "js/layui.js" },
                { from: "public/css/layui.css", to: "css/layui.css" }
            ],
        }),
        new webpack.DefinePlugin({
            'process.env.BACKEND_CONFIG': JSON.stringify(process.env.BACKEND_CONFIG),
        })
    ],
    resolve: {
        extensions: [".ts", "..."]
    },
    optimization: {
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                vendors: {
                    test: /node_modules/,
                    filename: "js/chunk-vendor.[name].js",
                }
            }
        },
        minimize: true,
        minimizer: [new TerserPlugin({
            terserOptions: {
                toplevel: true
                
            },
            extractComments: false
        })]
    }
};
