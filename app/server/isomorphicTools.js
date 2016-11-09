const IsomorphicTools = require('webpack-isomorphic-tools')
const IsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')

const isomorphicConfig = require('../../config/isomorphic.config')

module.exports.CustomIsomorphicTools = new IsomorphicTools(isomorphicConfig)
module.exports.IsomorphicPlugin = new IsomorphicToolsPlugin(isomorphicConfig)