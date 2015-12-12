var path = require('path');
var webpack = require('webpack');
var merge = require('./lodash/object/merge');

var srcPath = path.join(__dirname, 'src');
var distPath = path.join(__dirname, 'dist');
var isDev = (process.env.NODE_ENV === 'development');
var nodeEnv = isDev ? 'development' : 'production';
var preprocessParams = '?NODE_ENV=' + nodeEnv;

if (isDev) {
    distPath = path.join(__dirname, 'samples', 'dist');
    preprocessParams = '?+DEBUG&NODE_ENV=' + nodeEnv;
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
    'debug': isDev,
    'devtool': isDev ? 'eval' : undefined,
    'target': 'web',
    'entry': './xblocks.js',
    'context': srcPath,
    'output': {
        'path': distPath,
        'filename': 'xblocks-core.js',
        'library': 'xblocks',
        'libraryTarget': 'umd'
    },
    'externals': [
        {
            'react': {
                root: 'React',
                commonjs2: 'react',
                commonjs: 'react',
                amd: 'react'
            },
            'react-dom': {
                root: 'ReactDOM',
                commonjs2: 'react-dom',
                commonjs: 'react-dom',
                amd: 'react-dom'
            },
            'xtag': {
                root: 'xtag',
                commonjs2: 'xtag',
                commonjs: 'xtag',
                amd: 'xtag'
            }
        }
    ],
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
                'include': [ srcPath ]
            }
        ],
        'loaders': [
            {
                'test': /\.jsx?$/,
                'loader': 'babel!preprocess' + preprocessParams,
                'include': [ srcPath ]
            }
        ]
    },
    'plugins': [ define ]
};

var paramsXtag = {
    'debug': isDev,
    'devtool': isDev ? 'eval' : undefined,
    'target': 'web',
    'entry': './xtag.js',
    'context': srcPath,
    'output': {
        'filename': 'x-tag-core.js',
        'path': distPath,
        'library': 'xtag',
        'libraryTarget': 'umd'
    },
    'module': {
        'loaders': [
            {
                'test': /\.jsx?$/,
                'loader': 'babel!preprocess' + preprocessParams,
                'include': [ srcPath ]
            }
        ]
    }
};

var runs = [
    paramsXblocks,
    paramsXtag
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
