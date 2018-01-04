import * as path from "path"; 
import * as webpack from "webpack"; 
import "babel-polyfill"; 
import * as CleanWebpackPlugin from "clean-webpack-plugin"; 
import * as HtmlWebpackPlugin from "html-webpack-plugin"; 
import * as ExtractTextPlugin from "extract-text-webpack-plugin"; 
import * as UglifyJsPlugin from "uglifyjs-webpack-plugin"; 

const pkg = require("./package.json"); 
const IS_PROD: boolean = process.argv.indexOf("-p") > -1; 
console.log("inside webpack config: IS_PROD-" + IS_PROD); 
const config: webpack.Configuration = { 
    entry: { 
        "polyfills": ["./src/polyfills.ts"], "vendor": ["./src/vendor.ts"], "app": ["./src/main.ts"], 
    }, 
    output: { 
        path: path.resolve(__dirname, "dist"), filename: "scripts/[name].js", publicPath: "/" 
    }, 
    devtool: IS_PROD ? "source-map" : "cheap-module-source-map", 
    resolve: { extensions: [".ts", ".js", ".css", ".html"] }, 
    module: { 
        rules: [
            { test: /\.ts$/, enforce: "pre", loader: "tslint-loader", exclude: /node_modules/ }, 
            { test: /\.ts$/, use: [{ loader: "babel-loader" }, { loader: "ts-loader" }, { loader: "angular2-template-loader" }], exclude: /node_modules/ }, 
            { test: /\.js$/, loader: "babel-loader", exclude: /node_modules/, }, 
            { test: /\.html$/, loaders: ["html-loader"], exclude: /node_modules/ }, 
            { test: /\.css$/, use: ExtractTextPlugin.extract({ fallback: "style-loader", use: "css-loader" }), exclude: /node_modules/ }
        ]
    }, 
    plugins: [
        new CleanWebpackPlugin(["dist"]), 
        new ExtractTextPlugin("styles.css"), 
        new HtmlWebpackPlugin({ template: "./src/index.template.ejs", inject: "body" })    
        //htmlWebpackPlugin - will generate index.html and inject the bundle inside it.    
        //new HtmlWebpackPlugin({ template: './src/index.html' })  
    ],  
    devServer: {    
        contentBase: "./src",    
        hot: true,    inline: true,    
        port: "8080",    
        historyApiFallback: true,  
    }};
    export default config;
