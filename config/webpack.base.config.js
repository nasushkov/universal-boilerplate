const webpack = require('webpack')
const CleanPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')

const {IsomorphicPlugin} = require('../app/server/isomorphicTools')
const {ROOT_PATH, APP_PATH, BUILD_PATH, CONFIG_PATH, ICONS_PATH} = require('./paths')

const vendorModules = ['bluebird', 'classnames', 'lodash',
    'materialize-css', 'react', 'react-dom', 'react-helmet',
    'react-intl', 'react-redux', 'react-router',
    'redux', 'seamless-immutable', 'whatwg-fetch', 'react-parallax']

module.exports = {
    //Divide app and vendor bundles
    entry: {
        app: [APP_PATH]
        // vendor: vendorModules
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    //Output chunk files with hash codes for each chunk
    output: {
        path: BUILD_PATH,
        publicPath: '/',
        filename: '[name].[hash].js'
    },
    module: {
        preLoaders: [
            {
                test: /\.css$/,
                loaders: ['postcss'],
                include: APP_PATH
            },
            {
                test: /\.jsx?$/,
                loaders: ['eslint'],
                include: APP_PATH
            }
        ],
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css'),
                exclude: /module\.css$/,                
                include: [path.join(APP_PATH, 'css'), path.join(ROOT_PATH, 'node_modules')]
            },
            {
                test: IsomorphicPlugin.regular_expression('images'),
                loader: 'url-loader?limit=10240',
            },
            {
                test: /\.svg?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            },
            {
                test: /\.json$/i,
                loader: 'json',
            }
        ]
    },
    plugins: [        
        new CleanPlugin([BUILD_PATH], {
            root: ROOT_PATH
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
        new webpack.optimize.OccurenceOrderPlugin(),
        // new webpack.optimize.CommonsChunkPlugin('vendor', '[name].[hash].js'),
        new ExtractTextPlugin('styles.[hash].css', {
            allChunks: true
        })
    ]
}

module.exports.babelLoaderConfig = {
    test: /\.jsx?$/,
    include: [APP_PATH],
    loader: 'babel',
    query: {
        cacheDirectory: true,
        presets: ['es2015', 'react', 'stage-0'],
        plugins: [
            'add-module-exports',
            'lodash',
            'ramda',
            'react-require',
            ['provide-modules', {
                debug: 'debug'
            }],
            ['transform-runtime', {
                'polyfill': false,
                'regenerator': true
            }]
        ]
    }
}