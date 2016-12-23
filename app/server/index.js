import koa from 'koa'
import compress from 'koa-compress'
import logger from 'koa-logger'

import handleError from './middleware/handleError'

const app = koa()

app.use(compress())

if (debug.enabled('server')) {
    app.use(logger())
}

app.use(handleError)

export default app