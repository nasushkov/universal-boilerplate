const merge = require('webpack-merge')
const os = require('os')
const UglifyJsParallelPlugin = require('webpack-uglify-parallel')

const baseConfig = require('./webpack.dll.base.config.js')

module.exports = merge(baseConfig, {
    devtool: false,
    plugins: [        
        new UglifyJsParallelPlugin({
            workers: os.cpus().length,
            compress: {
                screw_ie8: true,
                warnings: false
            }
        })
    ]
})