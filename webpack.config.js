const path = require('path');

module.exports = {
    entry: './src/app/index.js',
    output: {
        path: path.join(__dirname, 'src', 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: path.join(__dirname, '/node_modules'),
            }
        ],
    },
}