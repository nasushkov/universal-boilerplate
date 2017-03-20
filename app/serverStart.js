import serve from 'koa-static'
import Router from 'koa-router'

import {isDevelopment, PORT} from '../config/environment'
import {ROOT_PATH, BUILD_PATH, SERVER_PATH, ASSETS_PATH, DLL_BUILD_PATH} from '../config/paths'
import {CustomIsomorphicTools, IsomorphicPlugin} from './server/isomorphicTools'
import app from './server/index'
import hotReload from './helpers/hotReload'

export const rootRouter = Router()

if (isDevelopment) {
    CustomIsomorphicTools.development()
    IsomorphicPlugin.development()
    hotReload(app)
    app.use(serve(ASSETS_PATH, { maxage: 31536000000 }))
    app.use(serve(DLL_BUILD_PATH, { maxage: 31536000000 }))
} else {
    app.use(serve(BUILD_PATH, { maxage: 31536000000 }))
}

CustomIsomorphicTools.server(ROOT_PATH, () => {
    if (isDevelopment) {
        app.use(function *() {
            const {setRoutes} = require(`${SERVER_PATH}/router`)
            setRoutes(CustomIsomorphicTools.assets(), rootRouter)
            yield rootRouter.routes()
        })
    } else {
        const {setRoutes} = require(`${SERVER_PATH}/router`)
        setRoutes(CustomIsomorphicTools.assets(), rootRouter)
        app.use(rootRouter.routes())
    }
})

app.listen(PORT)