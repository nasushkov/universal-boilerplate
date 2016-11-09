import {createStore} from 'redux'

import rootReducer from '../../reducers/rootReducer'
import getInitStateActions from '../../actions/initStateActions'

const log = {
    server: debug('server')
}

export default function *setStore(next) {
    log.server('Setting store...');
    this.store = createStore(rootReducer, {})
    getInitStateActions().forEach(act => this.store.dispatch(act))
    yield next
}
