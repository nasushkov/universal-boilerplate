import Router from 'koa-router'

import compose from './helpers/compose'
import setStore from './middleware/setStore'
import setRouteContext from './middleware/setRouteContext'
import renderRouteContext from './middleware/renderRouteContext'
import makeRoutes from '../containers/routes.jsx'
import apiRouter from './routes'

export const rootRouter = Router()

const log = {
    server: debug('server')
}

export function setRoutes(assets) {
    rootRouter.stack.length = 0

    const renderApp = compose(
        setStore,
        setRouteContext(makeRoutes),
        renderRouteContext(assets)
    )

    rootRouter
        .use(apiRouter.routes())
        .get('default', '/', function *(next){
            let defaultLocale = this.request.headers["accept-language"]

            log.server(`Browser locale:${defaultLocale}`)

            if(!defaultLocale || defaultLocale.indexOf('ru') > -1){
                defaultLocale = 'ru';
            } else {
                defaultLocale = 'en';
            }

            log.server(`Redirect to /${defaultLocale}`)

            this.redirect(`/${defaultLocale}`);
        })
        // .get('error', '/oops', renderApp)
        .get('react', '/:locale', renderApp)
}