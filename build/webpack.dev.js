const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const PORT = process.env.PORT && Number(process.env.PORT);

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
        new ESLintPlugin({
            extensions: ['js', 'jsx']
        })
    ],
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, '../dist'),
        compress: true,
        open : true,
        port: PORT || 9000
    }
});