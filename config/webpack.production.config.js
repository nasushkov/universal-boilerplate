const webpack = require('webpack')
const merge = require('webpack-merge')
const cssnext = require('postcss-cssnext')
const postreporter = require('postcss-reporter')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const {APP_PATH, BUILD_PATH, ASSETS_PATH, DLL_BUILD_PATH} = require('./paths')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

const {babelLoaderConfig, baseConfig} = require('./webpack.base.config')

babelLoaderConfig.query.plugins.push(['transform-react-constant-elements',
    'transform-react-inline-elements'])

module.exports = merge(baseConfig, {
    devtool: false,
    entry: {
        app: [
            'babel-polyfill',
            APP_PATH
        ]
    },
    output: {
        path: BUILD_PATH,
        publicPath: '/',
        filename: '[name]_[hash].js'
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            options: {
                postcss: [
                    cssnext, postreporter()
                ]
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true,
                warnings: false
            }
        }),
        new CopyWebpackPlugin([{
            from: DLL_BUILD_PATH,
            to: BUILD_PATH
        }])
    ],
    module: {
        rules: [
            {
                test: /module\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: [
                        'css-loader?modules&importLoaders=1&localIdentName=[hash:base64:5]',
                        'postcss-loader'
                    ]
                }),
                include: path.join(APP_PATH, 'components')
            },
            babelLoaderConfig
        ]
    }
})


