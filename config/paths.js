const path = require('path')

module.exports.ROOT_PATH = path.join(__dirname, '..')
module.exports.APP_PATH = path.join(module.exports.ROOT_PATH, 'app')
module.exports.NODE_MODULES_PATH = path.join(module.exports.ROOT_PATH, 'node_modules')
module.exports.DLL_BUILD_PATH = path.join(module.exports.ROOT_PATH, 'dll')
module.exports.BUILD_PATH = path.join(module.exports.ROOT_PATH, 'www')
module.exports.CONFIG_PATH = path.join(module.exports.ROOT_PATH,'config')
module.exports.ICONS_PATH = path.join(module.exports.NODE_MODULES_PATH, 'react-icons')
module.exports.ASSETS_PATH = path.join(module.exports.ROOT_PATH, 'assets')
module.exports.SERVER_PATH = path.join(module.exports.APP_PATH, 'server')
module.exports.ASSET_FILE = `${module.exports.BUILD_PATH}/webpack-assets.json`
module.exports.SPEC_PATH = path.join(module.exports.ROOT_PATH, 'spec')