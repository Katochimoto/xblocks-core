var path = require('path');
var webpack = require('webpack');
var merge = require('./lodash/object/merge');

var src = path.join(__dirname, 'src');
var dist = path.join(__dirname, 'dist');

var paramsXblocks = {
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

var paramsXtag = {
    'entry': './xtag.js',
    'context': src,
    'output': {
        'filename': 'x-tag-core.js',
        'path': dist,
    }
};

module.exports = [
    merge({}, paramsXblocks),
    merge({}, paramsXblocks, {
        'output': {
            'filename': 'xblocks-core.min.js'
        }
    }),

    merge({}, paramsXtag),
    merge({}, paramsXtag, {
        'output': {
            'filename': 'x-tag-core.min.js'
        }
    }),
];
