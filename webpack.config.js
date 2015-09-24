var path = require('path');
var webpack = require('webpack');
var objectAssign = require('object-assign');

var src = path.join(__dirname, 'src');
var dist = path.join(__dirname, 'dist');

var params = {
    'entry': './xblocks.js',
    'context': src,
    'output': {
        'path': dist,
        'filename': 'xblocks-core.js',
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
            '_': path.join(__dirname, 'lodash'),
        }
    },
    'plugins': [
        new webpack.DefinePlugin({
            'NODE_ENV': 'production'
        })
    ]
};

module.exports = [
    objectAssign({}, params),
    //objectAssign({}, params, {})
    {
        'entry': './xtag.js',
        'context': src,
        'output': {
            'filename': 'x-tag-core.js',
            'path': dist,
        }
    }
];
