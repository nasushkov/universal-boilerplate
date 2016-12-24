import ReactDOMServer from 'react-dom/server'
import {Provider} from 'react-redux'
import Helmet from 'react-helmet'
import {filter, identity} from 'ramda'
import path from 'path'

import Html from '../components/html.jsx'
import {BUILD_PATH, DLL_BUILD_PATH} from '../../../config/paths'
import {googleAnalyticsId, yaCounterId, isProduction} from '../../../config/environment'

const dllFilesPath = isProduction ? BUILD_PATH : DLL_BUILD_PATH

const libFile = '/' + require(path.join(dllFilesPath, 'lib-manifest.json')).name + '.js'
const reactFile = '/' + require(path.join(dllFilesPath, 'react-manifest.json')).name + '.js'

const log = {
    server: debug('server')
}

const makeHtml = (initialState, appHtml, helmet, assets) => {
    return ReactDOMServer.renderToStaticMarkup(
        <Html
            initialState={initialState}
            bodyScripts={[ libFile, reactFile, assets.javascript.app]}
            headStyles={[ assets.styles.app ]}
            bodyHtml={`<div id="reactMain">${appHtml}</div>`}
            helmet={helmet}
            googleAnalyticsId={googleAnalyticsId}
            yaCounterId={yaCounterId}
        />
    )
}

const renderApp = (store, routeContext) => {
    const appHtml = ReactDOMServer.renderToString(
        <Provider store={store}>
            {routeContext}
        </Provider>
    )
    return {appHtml, helmet: Helmet.rewind()}
}

export default function renderRouteContext(assets) {
    return function *() {
        log.server('Rendering routes...');
        log.server('Assets ' + JSON.stringify(assets))
        const {routeContext, store} = this
        const {appHtml, helmet} = renderApp(store, routeContext)
        const html = makeHtml(store.getState(), appHtml, helmet, assets)
        
        this.response.body = `<!doctype html>${html}`
    }
}