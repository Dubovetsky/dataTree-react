const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const devMode = process.env.ENV !== 'production';

module.exports = {
    entry: ['core-js', 'regenerator-runtime', './app/index'],
    output: {
        filename: devMode ? 'bundle.js' : 'bundle.[hash].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: devMode ? '/' : '/static/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            }, {
                test: /\.css$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader'
                ],
            }, {
                test: /\.(woff2?|ttf|eot|svg|png|jpe?g|gif|pdf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: (url, resourcePath, context) => {
                            if(/\.(svg|png|jpe?g|gif)/.test(url)) {
                                return `images/${url}`;
                            }
                            return `fonts/${url}`;
                        }
                    }
                }]
            }, {
                test: /\.scss$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    resolve: {
        modules: ['node_modules', 'app'],
        extensions: ['.js', '.jsx', '.json']
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            alwaysWriteToDisk: true,
            title: 'react-start-kit',
            template: './static/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : 'style.[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        })
    ]
};
