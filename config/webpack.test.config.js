const merge = require('webpack-merge')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const path = require('path')

const {APP_PATH, SPEC_PATH} = require('./paths')
let webpackBaseConfig = require('./webpack.base.config')
const {babelLoaderConfig} = require('./webpack.base.config')

babelLoaderConfig.include.push(SPEC_PATH)

module.exports =  merge(webpackBaseConfig, {
    target: 'node',
    externals: [nodeExternals()],
    devtool: "cheap-module-source-map",
    module: {
        loaders: [
            {
                test: /module\.css$/,
                loaders: [
                    'css/locals?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'],
                include: path.join(APP_PATH, 'components')
            },
            babelLoaderConfig
        ]
    }
})
