const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    module: {
        mode: 'development',
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }, {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            // enable CSS Modules
                            modules: true,
                            // customize generated class names
                            localIdentName: '[local]_[hash:base64:8]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // make sure to include the plugin!
        new VueLoaderPlugin()
    ]
}