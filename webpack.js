'use strict';

const webpack = require('webpack');
const path    = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const DEVELOPMENT_CONFIG = {
    entry: './index.js',
    output: {
        filename: 'bundle.min.js',
        path: path.join(__dirname, './public'),
    },
    plugins: [
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'window.$': 'jquery',
            'window.jQuery': 'jquery',
            '$.browser': 'jquery.browser',
            'jQuery.browser': 'jquery.browser',
            'window.$.broswer': 'jquery.browser',
            'window.jQuery.broswer': 'jquery.browser',
        }),
        new webpack.ProvidePlugin({
            'Promise': 'bluebird',
        }) 
    ],
    resolve: {
        modulesDirectories: [
            "node_modules",
            "app"
        ]
    },
    module: {
        loaders: [
            {
                test: /\.coffee$/,
                loader: 'coffee-loader'
              },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015']
                }
            },
            {
                test: /\.woff[\d]?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.(ttf|eot|svg|png|jpg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            },
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader',
            }
    ]},
    stats: {
        colors: true,
        modules: true,
        reasons: true,
    },
    devtool: 'eval-source-map',
    externals:[{
        xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}'
    }]
};

const PRODUCTION_CONFIG = {
    entry: './index.js',
    output: {
        filename: 'bundle.min.js',
        path: path.join(__dirname, './public'),
        publicPath: 'public/'
    },

    plugins: [
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'window.$': 'jquery',
            'window.jQuery': 'jquery',
            '$.browser': 'jquery.browser',
            'jQuery.browser': 'jquery.browser',
            'window.$.broswer': 'jquery.browser',
            'window.jQuery.broswer': 'jquery.browser',
        }),
        new webpack.ProvidePlugin({
            'Promise': 'bluebird',
        }),
        new UglifyJsPlugin()/*,
        
        new webpack.NormalModuleReplacementPlugin(
            /server\/config\/config\.prod\.js/,
            './config.js'
          )*/
    ],
    resolve: {
        modulesDirectories: [
            "node_modules",
            "app"
            ]
    },
    module: {
        loaders: [
            {
                test: /\.coffee$/,
                loader: 'coffee-loader'
              },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.woff[\d]?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.(ttf|eot|svg|png|jpg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            },
            {
                test: /\.(hbs|handlebars)$/,
                loader: 'handlebars-loader',
                query: {
                    helperDirs: [
                    path.join(__dirname, '/../assets/scripts/templates/helpers')
                    ]
                }
            }
    ]},
    stats: {
        colors: true,
        modules: true,
        reasons: true,
    },
    externals:[{
        xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}'
    }]
};

module.exports = { DEVELOPMENT_CONFIG, PRODUCTION_CONFIG };