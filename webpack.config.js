const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const isProduction = process.env.NODE_ENV === 'production';
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: isProduction ? 'production' : 'development',
    entry: path.resolve(__dirname, '/assets/css/main.css'),

    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: isProduction ? '[name].[hashfull].js' : '[name].js',
        chunkFilename: isProduction ? '[id].[hashfull].js' : '[id].js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    'css-loader',
                    'postcss-loader',
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: isProduction ? '[name].[fullhash].css' : '[name].css'
        }),
        new WebpackManifestPlugin({
            fileName: '../_data/manifest.yml',
            publicPath: './dist/',
        }),
    ],
};