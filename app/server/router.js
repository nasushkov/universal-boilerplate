import Router from 'koa-router'

import compose from './helpers/compose'
import setStore from './middleware/setStore'
import setRouteContext from './middleware/setRouteContext'
import renderRouteContext from './middleware/renderRouteContext'
import makeRoutes from '../containers/routes.jsx'
import apiRouter from './routes'

export const rootRouter = Router()

export function setRoutes(assets) {
    rootRouter.stack.length = 0

    const renderApp = compose(
        setStore,
        setRouteContext(makeRoutes),
        renderRouteContext(assets)
    )

    rootRouter
        .use(apiRouter.routes())
        .get('default', '/', renderApp)
}