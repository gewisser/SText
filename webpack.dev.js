const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = (env, argv) => {
    return merge(common(env, argv), {
        mode: 'development',
        watch: true,
        watchOptions: {
            ignored: /node_modules/
        },
        output: {
            path: path.resolve(__dirname, './app'),
        }
    })
};