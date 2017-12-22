let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: __dirname + '/src',
    entry: './app/app.module.js',
    output: {
        path: __dirname + '/target',
        filename: 'assets/[name].[hash].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/',
                query: {
                    presets: ['env']
                }
            },
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.(woff|woff2|eot|ttf|svg)$/, loader: 'file-loader'},
            {test: /\.html$/, loaders: 'html-loader'}
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ]
};