const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devtool: 'source-map',
    devServer: {
        port: 8081,
        proxy: {
            '/api/*': {
                target: 'http://localhost:8080',
                secure: false
            }
        }
    }
});