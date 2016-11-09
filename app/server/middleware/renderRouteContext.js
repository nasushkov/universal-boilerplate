import ReactDOMServer from 'react-dom/server'
import {Provider} from 'react-redux'
import Helmet from 'react-helmet'
import {filter, identity} from 'ramda'

import Html from '../components/html.jsx'
import {googleAnalyticsId, yaCounterId} from '../../../config/environment'

const log = {
    server: debug('server')
}
const compact = filter(identity)

const makeHtml = (initialState, appHtml, helmet, assets) => {
    return ReactDOMServer.renderToStaticMarkup(
        <Html
            initialState={initialState}
            bodyScripts={compact([ assets.javascript.vendor, assets.javascript.app ])}
            headStyles={compact([ assets.styles.vendor, assets.styles.app ])}
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