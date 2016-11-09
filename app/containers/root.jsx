import React from 'react'
import { Provider } from 'react-redux'
import Router from 'react-router/lib/Router'
import browserHistory from 'react-router/lib/browserHistory'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from '../configureStore'
import makeRoutes from './routes.jsx'

const store = configureStore(window.__INITIAL_STATE__)
const history = syncHistoryWithStore(browserHistory, store)

export default () => (
   <Provider store={store}>
       <Router history={history}>
           {makeRoutes()}
       </Router>
   </Provider>
)