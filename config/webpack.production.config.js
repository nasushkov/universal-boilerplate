const webpack = require('webpack')
const merge = require('webpack-merge')
const cssnext = require('postcss-cssnext')
const postreporter = require('postcss-reporter')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const {APP_PATH, BUILD_PATH, DLL_BUILD_PATH} = require('./paths')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const os = require('os')
const HappyPackPlugin = require('happypack')
const UglifyJsParallelPlugin = require('webpack-uglify-parallel')

const baseConfig = require('./webpack.base.config')
const babelLoaderConfig = require('./partials/babelLoaderConfig')

const coreNumber = os.cpus().length

babelLoaderConfig.plugins.push(['transform-react-constant-elements',
    'transform-react-inline-elements'])

module.exports = merge(baseConfig, {
    devtool: false,
    entry: {
        head: [
            path.join(APP_PATH, 'utils', 'loadCssAsync.js'),
        ],
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
        ]
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
        new UglifyJsParallelPlugin({
            workers: coreNumber,
            compress: {
                screw_ie8: true,
                warnings: false
            }
        }),
        new CopyWebpackPlugin([{
            from: DLL_BUILD_PATH,
            to: BUILD_PATH
        }]),
        new HappyPackPlugin({
            id: 'babel',
            threads: coreNumber,
            loaders: [{
                path: 'babel-loader',
                query: babelLoaderConfig
            }],
        }),
    ]
})


