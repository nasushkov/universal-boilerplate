const webpack = require('webpack')
const merge = require('webpack-merge')
const cssnext = require('postcss-cssnext')
const postreporter = require('postcss-reporter')
const path = require('path')
const os = require('os')
const HappyPackPlugin = require('happypack')

const baseConfig = require('./webpack.base.config')
const babelLoaderConfig = require('./partials/babelLoaderConfig')
const {APP_PATH} = require('./paths')

const coreNumber = os.cpus().length

babelLoaderConfig.plugins.push(['react-transform', {
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
        head: [
            path.join(APP_PATH, 'utils', 'loadCssAsync.js'),
        ],
        app: [
            'babel-polyfill',
            'webpack-hot-middleware/client',
            APP_PATH
        ]
    },
    devtool: 'cheap-eval-source-map',
    cache: true,    
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
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: false,
            options: {
                postcss: [
                    cssnext, postreporter()
                ]
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
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