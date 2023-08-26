var path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'production',
    target: ["web", "es5"],
    watch: false,
    devtool: 'source-map',
    entry: {
        global: './src/scss/global.scss'
    },
    output: {
        filename: 'js/[name].min.js',
        chunkFilename: 'js/[name].min.js',
        path: path.resolve(__dirname, './build/'),
    },
    module: {
        rules: [{
          test: /\.(scss|css)$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].min.css'
        })
    ]
};
