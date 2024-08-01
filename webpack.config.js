const path = require('path');

module.exports = {
    module: {
        rules: [{
            test: /\.(glsl|vs|fs)$/,
            loader: 'raw-loader',
            include: path.resolve(__dirname, 'src')
        }]
    }
};