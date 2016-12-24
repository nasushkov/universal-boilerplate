const merge = require('webpack-merge')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const path = require('path')

const {APP_PATH, SPEC_PATH} = require('./paths')
const {babelLoaderConfig, baseConfig} = require('./webpack.base.config')

babelLoaderConfig.include.push(SPEC_PATH)

module.exports =  merge(baseConfig, {
    entry: {
        app: [APP_PATH]
    },
    target: 'node',
    externals: [nodeExternals()],
    devtool: "cheap-module-source-map",
    module: {
        rules: [
            {
                test: /module\.css$/,
                use: [
                    'css-loader/locals?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
                ],
                include: path.join(APP_PATH, 'components')
            },
            babelLoaderConfig
        ]
    }
})

