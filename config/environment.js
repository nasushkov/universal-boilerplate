const nconf = require('nconf')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const isProd = process.env.NODE_ENV === 'production'
const isBrowserFunc = new Function("try {return this===window;}catch(e){ return false;}")

nconf.env({
    separator: '__',
    whitelist: ['PORT', 'appVersion', 'googleAnalyticsId', 'yaCounterId']
}).defaults({
    isProduction: isProd,
    isDevelopment: !isProd,
    PORT: 5000,
    googleAnalyticsId: 'UA-XXXXXXX-X',
    yaCounterId: '00000000',
    isBrowser: isBrowserFunc()
})

module.exports = nconf.get()