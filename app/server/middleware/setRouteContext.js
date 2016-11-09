import { RouterContext, match } from 'react-router'
import { trigger } from 'redial'
import createMemoryHistory from 'react-router/lib/createMemoryHistory'

import locData from '../../intl/locData'

const log = {
    server: debug('server')
}
const history = createMemoryHistory();

export default function(makeRoutes) {
    return function *(next) {
        try {
            log.server('Setting route context...')
            const { store } = this;
            this.routeContext = yield new Promise((resolve, reject) => {
                match({
                    routes: makeRoutes(),
                    location: history.createLocation(this.request.url)
                }, (error, redirect, renderProps) => {
                    if (redirect) {
                        log.server('Redirect')
                        return reject(this.redirect(`${redirect.pathname}${redirect.search}`))
                    } else if (!renderProps) {
                        return resolve(<p>{locData[renderProps.params['locale']].notFound}</p>)
                    } else if (error) {
                        return reject(this.throw(error.message))
                    }
                    log.server('Render props location: ' + JSON.stringify(renderProps.location))
                    log.server('Render props params: ' + JSON.stringify(renderProps.params))

                    trigger('prefetch', renderProps.components, {
                        dispatch: store.dispatch,
                        location: renderProps.location,
                        params: renderProps.params
                    }).then(() =>
                        resolve(<RouterContext {...renderProps} />)
                    )
                })
            })
            yield next
        } catch (error) {
            if (error == null) return
            throw error
        }
    }
}