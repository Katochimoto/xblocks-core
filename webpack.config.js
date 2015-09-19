var path = require('path');
var webpack = require('webpack');
var src = path.join(__dirname, 'src');
var srcLib = path.join(src, 'xblocks');

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

            'context': path.join(src, 'context'),
            'polyfills': path.join(src, 'polyfills'),

            'block': path.join(srcLib, 'block'),
            'dom': path.join(srcLib, 'dom'),
            'element': path.join(srcLib, 'element'),
            'event': path.join(srcLib, 'event'),
            'utils': path.join(srcLib, 'utils'),
            'view': path.join(srcLib, 'view')
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
