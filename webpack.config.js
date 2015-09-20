var path = require('path');
var webpack = require('webpack');

module.exports = {
    'context': path.join(__dirname, 'src'),
    'output': {
        'path': path.join(__dirname, 'dist'),
        'library': 'xblocks',
        'libraryTarget': 'umd'
    },
    'externals': {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'xtag': 'xtag'
    },
    'plugins': [
        new webpack.DefinePlugin({
            'DEBUG': false,
            'DEBUG_TIME': false,
            'NODE_ENV': 'production'
        })
    ]
};
