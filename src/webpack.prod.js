const path = require('path'),
    fs = require("fs");

const webpack = require("webpack"),
    { CleanWebpackPlugin } = require('clean-webpack-plugin'),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
    rawPackage = fs.readFileSync(path.resolve(__dirname + '/../package.json')),
    packageInfo = JSON.parse(rawPackage);

module.exports = {
    entry: {
        index: path.resolve(__dirname, './index.js'),
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        hashFunction: 'sha256',
    },
    optimization: {
        minimize: true,
        minimizer: [
            new UglifyJsPlugin()
        ]
    },
    plugins: [
        new webpack.BannerPlugin(
            fs.readFileSync(
                path.resolve(__dirname + '/header.txt'),
                'utf8'
            ).replace('%AUTHOR%', packageInfo.author)
            .replace('%NAME%', packageInfo.name)
            .replace('%VERSION%', packageInfo.version)
        ),
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    ],
    module: {
        rules: [{
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
        }, ],
    },
    resolve: {
        extensions: ['*', '.js', ],
    },
    mode: 'production',
};
