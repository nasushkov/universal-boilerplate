import koa from 'koa'
import compress from 'koa-compress'
import logger from 'koa-logger'
import favicon from 'koa-favicon'
import serve from 'koa-static'

import handleError from './middleware/handleError'
import {ASSETS_PATH} from '../../config/paths'

const app = koa()

app.use(compress())

if (debug.enabled('server')) {
    app.use(logger())
}

app.use(handleError)
app.use(serve(ASSETS_PATH, { maxage: 31536000000 }))

export default app