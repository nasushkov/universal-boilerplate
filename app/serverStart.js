import serve from 'koa-static';

import {isDevelopment, PORT} from '../config/environment'
import {ROOT_PATH, BUILD_PATH, SERVER_PATH} from '../config/paths'
import {CustomIsomorphicTools, IsomorphicPlugin} from './server/isomorphicTools'
import app from './server/index'
import hotReload from './helpers/hotReload'

if (isDevelopment) {
    CustomIsomorphicTools.development()
    IsomorphicPlugin.development()
    hotReload(app)
} else {
    app.use(serve(BUILD_PATH, { maxage: 31536000000 }))
}

CustomIsomorphicTools.server(ROOT_PATH, () => {
    if (isDevelopment) {
        app.use(function *() {
            const {rootRouter, setRoutes} = require(`${SERVER_PATH}/router`)
            setRoutes(CustomIsomorphicTools.assets())
            yield rootRouter.routes()
        })
    } else {
        const {rootRouter, setRoutes} = require(`${SERVER_PATH}/router`)
        setRoutes(CustomIsomorphicTools.assets())
        app.use(rootRouter.routes())
    }
})

app.listen(PORT)