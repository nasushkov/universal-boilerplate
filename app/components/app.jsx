import React from 'react'
import Helmet from 'react-helmet'
import {injectIntl, intlShape} from 'react-intl'

const bootstrap4Metas = [
    {charset: 'utf-8'},
    {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, shrink-to-fit=no'
    },
    {
        'http-equiv': 'x-ua-compatible',
        content: 'ie=edge'
    }
]

const App = (({intl: {locale, messages}}) => (
    <div>
        <Helmet
            htmlAttributes={{ lang: locale }}
            title={messages.appTitle}
            meta={[
                   ...bootstrap4Metas
                ]}
        >
        </Helmet>
    </div>
))

Footer.propTypes = {
    intl: intlShape.isRequired
}

export default injectIntl(App)
