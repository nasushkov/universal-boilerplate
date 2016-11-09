import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { combineForms } from 'react-redux-form'

export default combineReducers({
    routing: routerReducer,
    formState: combineForms({
       //PUT Forms boilerplate here
    }, 'formState')
})
