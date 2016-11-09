import {call, put, select} from 'redux-saga/effects'
import {takeLatest} from 'redux-saga'
import {actions, getModel} from 'react-redux-form'

import {SUBMIT_FORM} from '../actions/submitFormActions'

function* submit({
    payload: {
        modelPath,
        formData,
        submitDataCall,
        options: ops
    }
}) {
    const options = ops || {}
    if (options.validators) {
        yield put(actions.validate(modelPath, options.validators))
    } else if (options.errors) {
        yield put(actions.validateFieldsErrors(modelPath, options.errors))
    }
    if (options.validate) {
        const state = yield select()
        if (!state[modelPath + '.$form'].valid) {
            return
        }
    }
    yield put(actions.setPending(modelPath, true))

    const errorsAction = options.fields
        ? actions.setFieldsErrors
        : actions.setErrors

    try {
        const response = yield call(submitDataCall, [formData])
        yield put(actions.setSubmitted(modelPath, true))
        yield put(actions.setValidity(modelPath, response))
    }
    catch (err) {
        yield put(actions.setSubmitFailed(modelPath))
        yield put(errorsAction(modelPath, err))
    }
}

export default function* watchSubmit() {
    yield takeLatest(SUBMIT_FORM, submit)
}