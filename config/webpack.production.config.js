const webpack = require('webpack')
const merge = require('webpack-merge')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const {APP_PATH} = require('./paths')
const path = require('path')

const webpackConfig = require('./webpack.base.config')
const {babelLoaderConfig} = require('./webpack.base.config')

babelLoaderConfig.query.plugins.push(['transform-react-constant-elements',
    'transform-react-inline-elements'])

module.exports = merge(webpackConfig, {
    devtool: null,
    plugins: [         
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true,
                warnings: false
            }
        })
    ],
    postcss: [
        autoprefixer({browsers: ['last 2 versions']}),
        cssnano()
    ],
    module: {
        loaders: [
            {
                test: /module\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[hash:base64:5]'),
                include: path.join(APP_PATH, 'components')
            },
            babelLoaderConfig
        ]
    }
})
