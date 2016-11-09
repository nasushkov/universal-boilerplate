import {createAction} from 'redux-actions'

export const SUBMIT_FORM = 'SUBMIT_FORM'
export const submitForm = createAction(SUBMIT_FORM, (modelPath, formData, submitDataCall, options) => ({
    modelPath,
    formData,
    submitDataCall,
    options
}))