import React, {Component} from 'React'
import classNames from 'classnames'
import _ from 'lodash'
import {setPropTypes, pure} from 'recompose'

import getTruthyProps from '../../helpers/truthyProps'

export default pure(setPropTypes({
    innerState: React.PropTypes.object.isRequired    
})((props) => {
    const errors = props.innerState.touched
        ? Array.from(getTruthyProps(props.innerState.errors || {})).map(val => props.messages[val[1]]).join(', ')
        : ''

    const focus = props.innerState.focus

    const inputClassName = classNames('materialize-textarea', 'validate', {
        'invalid': errors.length,
        [props.className]: props.className
    })

    const labelClassName = classNames({
        'active': focus || props.innerState.value || errors.length
    })

    const inputProps = _.omit(props, ['placeholder', 'innerState', 'className', 'messages'])

    return (
        <div className="input-field">
            <textarea {...inputProps} className={inputClassName}/>
            <label htmlFor={props.id} className={labelClassName} data-error={errors}>{props.placeholder}</label>
        </div>
    );
}))