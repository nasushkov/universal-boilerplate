const IsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
const {ASSET_FILE} = require('./paths')

module.exports = {
    webpack_assets_file_path: ASSET_FILE,
    assets: {
        images: {
            extensions: [
                'jpeg', 'jpg', 'png', 'gif', 'svg'
            ]
        },
        fonts: {
            extensions: [
                'woff', 'ttf', 'woff2', 'eot'
            ]
        },
        style_modules: {
            extensions: ['css'],
            filter: function(module, regex, options, log) {
                if (options.development) {
                    // in development mode there's webpack "style-loader",
                    // so the module.name is not equal to module.name
                    return IsomorphicToolsPlugin.style_loader_filter(module, regex, options, log);
                }
                 // in production mode there's no webpack "style-loader",
                 // so the module.name will be equal to the asset path
                 return regex.test(module.name);
            },
            path: function(module, options, log) {
                if (options.development) {
                    // in development mode there's webpack "style-loader",
                    // so the module.name is not equal to module.name
                    return IsomorphicToolsPlugin.style_loader_path_extractor(module, options, log);
                }
                // in production mode there's no webpack "style-loader",
                // so the module.name will be equal to the asset path
                return module.name;
            },
            parser: function(module, options, log) {
                if (options.development) {
                    return IsomorphicToolsPlugin.css_modules_loader_parser(module, options, log);
                }
                // in production mode there's Extract Text Loader which extracts CSS text away
                return module.source;
            }
        }
    }
}