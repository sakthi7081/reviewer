const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.PORT || 3000;

module.exports = {  
  entry: './src/index.jsx',
  output: {
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }, {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
            {
            loader: 'babel-loader',
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react"
            ], 
            plugins: [
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-syntax-dynamic-import",
              'transform-class-properties'
            ]
            }
            },
          ]         
      },      
      { 
        test: /\.(woff|woff2|eot|ttf)$/, 
        loader: 'url-loader' 
      },           
      {
        test: /\.(css|scss)$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ]
        },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
            {
                loader: 'url-loader',
                options:{
                    fallback: "file-loader",
                    name: "[name][md5:hash].[ext]"
                }
            }    
        ]
    }      
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      favicon: 'public/favicon.ico'
    })
  ],
  devServer: {
    host: 'localhost',
    port: port,
    historyApiFallback: true,
    open: true
  }
};