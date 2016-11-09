import React from 'react'
import {connect} from 'react-redux'
import {IntlProvider, addLocaleData} from 'react-intl'
import ruLocaleData from 'react-intl/locale-data/ru'
addLocaleData(ruLocaleData)

import App from '../components/app.jsx'
import locData from '../intl/locData'

export default connect((state, ownProps) => ({
    locale: ownProps.params.locale
}))(({locale}) => {  
    const messages = locData[locale]
    
    return (
        <IntlProvider locale={locale} messages={messages}>
            <App />
        </IntlProvider>
    )
})