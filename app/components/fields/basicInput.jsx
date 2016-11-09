import React, {Component} from 'React'
import classNames from 'classnames'
import _ from 'lodash'
import {setPropTypes, pure} from 'recompose'

import getTruthyProps from '../../helpers/truthyProps'
import iconFactory from '../iconFactory'

const ACTIVE_COLOR = '#26a69a'
const DEFAULT_COLOR = 'black'

export default pure(setPropTypes({
    innerState: React.PropTypes.object.isRequired,
    iconPrefix: React.PropTypes.string
})((props) => {
    const errors = props.innerState.touched
        ? Array.from(getTruthyProps(props.innerState.errors || {})).map(val => props.messages[val[1]]).join(', ')
        : ''

    const focus = props.innerState.focus

    const iconColor = focus ? ACTIVE_COLOR : DEFAULT_COLOR

    const inputClassName = classNames('validate', {
        'invalid': errors.length,
        [props.className]: props.className
    })

    const labelClassName = classNames({
        'active': focus || props.innerState.value || errors.length
    })

    const inputProps = _.omit(props, ['placeholder', 'innerState', 'iconPrefix', 'className', 'messages'])

    return (
        <div className="input-field">
            {
                (() => {
                    if(props.iconPrefix){
                        const PrefixIcon = iconFactory(props.iconPrefix)
                        return <PrefixIcon className="prefix" color={iconColor}/>
                    }
                })()
            }
            <input {...inputProps} type={props.type} className={inputClassName}/>
            <label htmlFor={props.id} className={labelClassName} data-error={errors}>{props.placeholder}</label>
        </div>
    )
}))
