const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
    const fully_assembl = env && env.F;
    const is_production = argv.mode === 'production';

    return {
        context: path.resolve(__dirname, './src'),
        entry: {
            build: './main.js'
        },

        output: {
            filename: '[name].bundle.js?[hash]',
            chunkFilename: '[name].bundle.js?[hash]'
        },

        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        hotReload: false // отключает горячую перезагрузку
                    }
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader?cacheDirectory',
                    exclude: file => (
                        /node_modules/.test(file) &&
                        !/\.vue\.js/.test(file)
                    )
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            //options: { modules: true }
                        }
                    ]
                },
                {
                    test: /\.(sass)$/,
                    oneOf: [
                        {
                            resourceQuery: /^\?vue/,
                            use: [
                                'vue-style-loader',
                                {
                                    loader: 'css-loader',
                                    // options: { modules: true }
                                },
                                {
                                    loader: 'sass-loader',
                                    options: {
                                        sassOptions: {
                                            indentedSyntax: true
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            use: [
                                MiniCssExtractPlugin.loader,
                                'css-loader',
                                'sass-loader'
                            ]
                        }
                    ],
                },
                {
                    test: /\.(scss)$/,
                    oneOf: [
                        {
                            resourceQuery: /^\?vue/,
                            use: [
                                //MiniCssExtractPlugin.loader,
                                'vue-style-loader',
                                {
                                    loader: 'css-loader',
                                    //options: { modules: true }
                                },
                                'sass-loader'
                            ]
                        },
                        {
                            use: [
                                MiniCssExtractPlugin.loader,
                                'css-loader',
                                'sass-loader'
                            ]
                        }
                    ],

                },

                {
                    test: /\.(woff2|eot|ttf|otf|woff)$/,
                    loader: 'null-loader'
                },
                {
                    test: /\.pug$/,
                    oneOf: [
                        // это применяется к `<template lang="pug">` в компонентах Vue
                        {
                            resourceQuery: /^\?vue/,
                            use: ['pug-plain-loader']
                        },
                        // это применится для фалов с раширением .pug
                        {
                            use: [
                                {
                                    loader: 'file-loader',
                                    options: {
                                        name: '[name].html'
                                    }
                                },
                                'pug-plain-loader'
                            ]
                        }
                    ]
                },
                {
                    test: /\.(ttf|mp3|ico|png|jpg|gif|svg)$/,
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]?[hash]',
                        esModule: false
                    }
                },
            ],
        },

        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@': path.resolve(__dirname, 'src/')
            }
        },

        plugins: [
            new HtmlWebpackPlugin({
                inject: 'body',
                template: 'index.html'
            }),
            new VueLoaderPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].style.css?[hash]'
            }),
            new CopyWebpackPlugin([
                {from: 'electron.js'},
            ], {
                copyUnmodified: false
            })
        ]
    };
};