const webpack = require('webpack')
const merge = require('webpack-merge')

const baseConfig = require('./webpack.dll.base.config.js')

module.exports = merge(baseConfig, {
    devtool: 'source-map',    
    cache: true
})