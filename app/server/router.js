import compose from './helpers/compose'
import setStore from './middleware/setStore'
import makeRenderReactApp from './middleware/renderReactApp'
import routes from '../containers/routes.jsx'
import apiRouter from './routes'
import isEmpty from 'lodash/isEmpty'

export function setRoutes(assets, rootRouter) {
    rootRouter.stack.length = 0

    const inlineStyles = isEmpty(assets.styles) ? Object.getOwnPropertyNames(assets.assets).map((propName) => {
        if (propName.endsWith('.css')) {
            return assets.assets[propName];
        }
    }) : []

    const assetMap = {       
        otherLinks: [],
        headScripts: [assets.javascript.head],
        headStyles: [assets.styles.app, assets.styles.head],
        bodyScripts: [assets.javascript.app],
        bodyStyles: [],
        stringScripts: [],
        inlineStyles,
    }

    const renderApp = makeRenderReactApp(routes, assetMap)

    const processApp = compose(
        setStore,
        renderApp
    )

    rootRouter
        .use(apiRouter.routes())
        .get('default', '/', processApp)
}