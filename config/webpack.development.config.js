const webpack = require('webpack')
const merge = require('webpack-merge')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')

const webpackConfig = require('./webpack.base.config')
let {babelLoaderConfig} = require('./webpack.base.config')
const {APP_PATH, ROOT_PATH} = require('./paths')

babelLoaderConfig.query.plugins.push(['react-transform', {
    'transforms': [{
        'transform': 'react-transform-hmr',
        'imports': ['react'],
        'locals': ['module'],
    }, {
        'transform': 'react-transform-catch-errors',
        'imports': ['react', 'redbox-react'],
    }]
}])

module.exports = merge(webpackConfig, {
    entry: {
        app: [
            'babel-polyfill',
            'webpack-hot-middleware/client'
        ]
    },    
    devtool: 'cheap-module-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    postcss: [
        autoprefixer({browsers: ['last 2 versions']})
    ],
    module: {
        loaders: [
            {
                test: /module\.css$/,
                loaders: [
                    'style',
                    'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'],
                include: path.join(APP_PATH, 'components')
            },
            babelLoaderConfig,
            {
                test: /\.js$|\.jsx$/,
                loader: "eslint",
                include: [APP_PATH]
            }
        ]
    }
})