const webpack = require('webpack')
const CleanPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')

const {IsomorphicPlugin} = require('../app/server/isomorphicTools')
const {ROOT_PATH, APP_PATH, BUILD_PATH, DLL_BUILD_PATH} = require('./paths')

module.exports = {
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: BUILD_PATH,
        publicPath: '/',
        filename: '[name]_[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                enforce: "pre",
                loader: 'eslint-loader',
                include: APP_PATH
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: [
                        {
                            loader: 'css-loader'
                        }
                    ]
                }),
                exclude: /module\.css$/,
                include: [path.join(APP_PATH, 'css'), path.join(ROOT_PATH, 'node_modules')]
            },
            {
                test: IsomorphicPlugin.regular_expression('images'),
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10240
                    }
                }]
            },
            {
                test: /\.svg?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'image/svg+xml'
                    }
                }]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/font-woff'
                    }
                }]
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            },
            {
                test: /\.json$/i,
                loader: 'json-loader',
            }
        ]
    },
    plugins: [        
        new CleanPlugin([BUILD_PATH], {
            root: ROOT_PATH
        }),
        new webpack.DllReferencePlugin({
            context: process.cwd(),
            manifest: path.join(DLL_BUILD_PATH, 'lib-manifest.json')
        }),
        new webpack.DllReferencePlugin({
            context: process.cwd(),
            manifest: path.join(DLL_BUILD_PATH, 'react-manifest.json')
        }),
        IsomorphicPlugin,
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
                'DEBUG': JSON.stringify(process.env.DEBUG)
            }
        }),
        new webpack.ProvidePlugin({
            'Promise': 'bluebird'
        }),
        new ExtractTextPlugin({
            filename: 'styles_[hash].css',
            disable: false,
            allChunks: true
        })
    ]
}

module.exports.babelLoaderConfig = {
    test: /\.jsx?$/,
    include: [APP_PATH],
    loader: 'babel-loader',
    query: {
        cacheDirectory: true,
        presets: [['es2015', {modules: false, loose: true}], 'react', 'stage-0'],
        plugins: [
            'add-module-exports',
            'lodash',
            'ramda',
            'react-require',
            ['provide-modules', {
                debug: 'debug'
            }],
            ['transform-runtime', {
                'polyfill': true,
                'regenerator': true
            }],
            "transform-object-assign"
        ]
    }
}