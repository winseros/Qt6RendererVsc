"use strict";

const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const outputPath = path.resolve(__dirname, "dist");

//@ts-check
/** @typedef {import('webpack').Configuration} WebpackConfig **/

/** @type WebpackConfig */
const extensionConfig = {
    target: "node",
    mode: "none",

    entry: "./src/extension.ts",
    output: {
        path: outputPath,
        filename: "extension.js",
        libraryTarget: "commonjs2"
    },
    externals: {
        vscode: "commonjs vscode" // the vscode-module is created on-the-fly and must be excluded. Add other modules that cannot be webpack'ed, 📖 -> https://webpack.js.org/configuration/externals/
        // modules added here also need to be added in the .vscodeignore file
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            }
        ]
    },
    devtool: "nosources-source-map",
    infrastructureLogging: {
        level: "log"
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: "qt6renderer/python",
                    to: path.join(outputPath, "qt6renderer", "python")
                }
            ]
        })
    ]
};
module.exports = [extensionConfig];
