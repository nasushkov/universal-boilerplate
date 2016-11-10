import {createStore} from 'redux'

import rootReducer from '../../reducers/rootReducer'

const log = {
    server: debug('server')
}

export default function *setStore(next) {
    log.server('Setting store...');
    this.store = createStore(rootReducer, {})
    yield next
}
