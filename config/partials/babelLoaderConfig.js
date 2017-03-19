
module.exports = {
    cacheDirectory: true,
    presets: [['es2015', {modules: false, loose: true}], 'react', 'stage-0'],
    plugins: [
        'add-module-exports',
        'lodash',
        'ramda',
        'react-require',
        ['provide-modules', {
            debug: 'debug'
        }],
        ['transform-runtime', {
            'polyfill': true,
            'regenerator': true
        }],
        "transform-object-assign"
    ]
}