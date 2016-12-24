const webpack = require('webpack')
const merge = require('webpack-merge')
const cssnext = require('postcss-cssnext')
const postreporter = require('postcss-reporter')
const path = require('path')

const {babelLoaderConfig, baseConfig} = require('./webpack.base.config')
const {APP_PATH} = require('./paths')

babelLoaderConfig.options.plugins.push(['react-transform', {
    'transforms': [{
        'transform': 'react-transform-hmr',
        'imports': ['react'],
        'locals': ['module'],
    }, {
        'transform': 'react-transform-catch-errors',
        'imports': ['react', 'redbox-react'],
    }]
}])

module.exports = merge(baseConfig, {
    entry: {
        app: [
            'babel-polyfill',
            'webpack-hot-middleware/client',
            APP_PATH
        ]
    },
    devtool: 'source-map',
    cache: true,
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: false,
            options: {
                postcss: [
                    cssnext, postreporter()
                ]
            }
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /module\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]___[hash:base64:5]'
                        }
                    },
                    'postcss-loader'
                ],
                include: path.join(APP_PATH, 'components')
            },
            babelLoaderConfig
        ]
    }
})