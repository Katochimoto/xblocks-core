var path = require('path');
var webpack = require('webpack');
var merge = require('./lodash/object/merge');

var src = path.join(__dirname, 'src');
var dist = path.join(__dirname, 'dist');
var isDev = (process.env.NODE_ENV === 'development');
var nodeEnv = isDev ? 'development' : 'production';
var preprocessParams = '?NODE_ENV=' + nodeEnv;
var envParams = {};

if (isDev) {
    dist = path.join(__dirname, 'samples', 'dist');
    preprocessParams = '?+DEBUG&NODE_ENV=' + nodeEnv;
    envParams = {
        'debug': true,
        'devtool': 'eval'
    };
}

var define = new webpack.DefinePlugin({
    'NODE_ENV': nodeEnv
});

var uglify = new webpack.optimize.UglifyJsPlugin({
    'output': {
        'comments': false
    },
    'compress': {
        'warnings': false
    }
});

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
            '_': path.join(__dirname, 'lodash')
        }
    },
    'module': {
        'preLoaders': [
            {
                'test': /\.jsx?$/,
                'loader': 'eslint',
                'include': [ src ]
            }
        ],
        'loaders': [
            {
                'test': /\.jsx?$/,
                'loader': 'babel!preprocess' + preprocessParams,
                'include': [ src ]
            }
        ]
    },
    'plugins': [ define ]
};

var paramsXtag = {
    'entry': './xtag.js',
    'context': src,
    'output': {
        'filename': 'x-tag-core.js',
        'path': dist
    }
};

var runs = [
    merge({}, paramsXblocks, envParams),
    merge({}, paramsXtag, envParams)
];

if (!isDev) {
    runs.push(merge({}, paramsXblocks, {
        'output': {
            'filename': 'xblocks-core.min.js'
        },
        'plugins': [ define, uglify ],
        'devtool': '#source-map'
    }));

    runs.push(merge({}, paramsXtag, {
        'output': {
            'filename': 'x-tag-core.min.js'
        },
        'plugins': [ uglify ],
        'devtool': '#source-map'
    }));
}

module.exports = runs;
