import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'
import browserHistory from 'react-router/lib/browserHistory'
import { routerMiddleware } from 'react-router-redux'

import rootReducer from './reducers/rootReducer'
import submitSaga from './sagas/submitSaga'

const loggerMiddleware = createLogger()
const rMiddleware = routerMiddleware(browserHistory)
const sagaMiddleware = createSagaMiddleware()

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState, compose(
        applyMiddleware(loggerMiddleware, rMiddleware, thunk, sagaMiddleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ))

    sagaMiddleware.run(submitSaga)

    if(module.hot){
        module.hot.accept('./reducers/rootReducer', () => {
            const nextReducer = require('./reducers/rootReducer').default
            store.replaceReducer(nextReducer)
        })
    }
    return store
}
