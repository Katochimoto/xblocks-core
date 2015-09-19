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
    'resolve': {
        'alias': {
            'setImmediate': 'setImmediate2/src/index.js',
            'block': path.join(__dirname, 'src', 'xblocks', 'block'),
            'context': path.join(__dirname, 'src', 'context'),
            'dom': path.join(__dirname, 'src', 'xblocks', 'dom'),
            'element': path.join(__dirname, 'src', 'xblocks', 'element'),
            'event': path.join(__dirname, 'src', 'xblocks', 'event'),
            'polyfills': path.join(__dirname, 'src', 'polyfills'),
            'utils': path.join(__dirname, 'src', 'xblocks', 'utils'),
            'view': path.join(__dirname, 'src', 'xblocks', 'view')
        }
    },
    'plugins': [
        new webpack.DefinePlugin({
            'DEBUG': false,
            'DEBUG_TIME': false,
            'NODE_ENV': 'production'
        })
    ]
};
