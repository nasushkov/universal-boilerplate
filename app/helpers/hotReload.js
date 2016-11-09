import chokidar from 'chokidar'
import webpack from 'webpack'

import webpackDevelopmentConfig from '../../config/webpack.development.config.js'
import {CustomIsomorphicTools} from '../server/isomorphicTools'
import {SERVER_PATH} from '../../config/paths'

const log = {
    webpack: debug('webpack'),
    hot: debug('hot-reload')
}

const serverRegexp = /\/app\/server\//
const clientRegexp = /\/app\//


export default function hotReload(app) {
    const compiler = webpack(webpackDevelopmentConfig)

    compiler.plugin('compile', () => log.webpack('Webpack compile started...'))
    compiler.plugin('compilation', () => log.webpack('Webpack compiling...'))

    app.use(require('koa-webpack-dev-middleware')(compiler, {
        quiet: false,
        noInfo: true,
        stats: {
            colors: true,
            reasons: true,
        },
        publicPath: webpackDevelopmentConfig.output.publicPath
    }))

    app.use(require('koa-webpack-hot-middleware')(compiler))

    const watcher = chokidar.watch(SERVER_PATH)
    log.hot('Watching server source')
    watcher.on('ready', () => {
        watcher.on('all', () => {
            log.hot('Clearing /server/ module cache from server');
            Object.keys(require.cache).forEach((id) => {
                if (serverRegexp.test(id)) {
                    delete require.cache[id]
                }
            })
        })
    })

    log.hot('Watching client app source')
    compiler.plugin('done', () => {
        log.hot('Clearing /app/ module cache from server')
        Object.keys(require.cache).forEach((id) => {
            if (clientRegexp.test(id)) {
                delete require.cache[id]
            }
            if (serverRegexp.test(id)) {
                delete require.cache[id]
            }
        })
        CustomIsomorphicTools.refresh()
    })
}