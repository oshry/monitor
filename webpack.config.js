var path = require('path');

process.traceDeprecation = true;
module.exports = {
        context: __dirname,
            entry: {
                main: ['./src/js/main.js']
        },
    output: {
        filename: 'main.bundle.js',
        publicPath: "/dist",
        path: __dirname + '/server/dist'
    },
        module: {
    rules: [
        {
                test: /.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['babel-preset-es2015'].map(require.resolve)
                }
            }
    ]
},
    devServer: {
        contentBase: path.join(__dirname, '/src/'),
        compress: true,
        port: 9000,
        watchContentBase: true,
        watchOptions: {
            poll: true
        },
        historyApiFallback: true,
        historyApiFallback: {
            // rewrites: [
            //     { from: /^\/tacos/, to: '/index.html' },
            // ],
            index: '/index.html',
        },

        // proxy: {
        //     "/tacos/bus": {
        //         target: "http://localhost:9000",
        //         pathRewrite: { '^/tacos': '' },
        //     }
        // },

    },
plugins: [],
    externals: {
        jquery: 'jQuery'
    }
};