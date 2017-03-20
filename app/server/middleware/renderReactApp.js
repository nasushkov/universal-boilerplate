import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import debug from 'debug'
import path from 'path'

import getRouteContext from '../utils/getRouteContext'
import makeHtml from '../utils/makeHtml'

import { DLL_BUILD_PATH } from '../../../config/paths'
import cloneDeep from 'lodash/cloneDeep'

const libFile = '/' + require(path.join(DLL_BUILD_PATH, 'lib-manifest.json')).name + '.js'
const reactFile = '/' + require(path.join(DLL_BUILD_PATH, 'react-manifest.json')).name + '.js'

const log = debug('server')

export default function (makeRoutes, webpackAssets) {

    return function *renderReactApp() {
        try {
            log('Retrieving route context...')

            const routeContext = yield getRouteContext(this, makeRoutes())

            const assets = cloneDeep(webpackAssets)

            const store = this.store;

            log('Start! Rendering body html...')

            const bodyHtml = ReactDOMServer.renderToString(
                <Provider store={store}>
                    {routeContext}
                </Provider>
            )

            log('Done! Body html is rendered')

            log('Populating scripts...')

            assets.stringScripts.push(
                `window.__INITIAL_STATE__ = ${
                    JSON.stringify(store.getState(), null, 2)
                    };`
            )
            assets.bodyScripts.unshift(libFile, reactFile)

            log('Start! Rendering React app...')

            const html = makeHtml({ assets, bodyHtml })

            log('Done! React app is rendered.')

            this.response.body = html

        } catch (error) {
            log(error)
            if (error instanceof Error) throw error
        }
    }
}