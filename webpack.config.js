const {VueLoaderPlugin}=require('vue-loader');
module.exports = {
    entry: __dirname + '/src/app/main.js',
    output: {
        path: __dirname + '/src/public/js',
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },

        ]
    },
    plugins: [
        new VueLoaderPlugin
    ]
};