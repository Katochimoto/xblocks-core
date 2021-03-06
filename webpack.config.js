var path = require('path');
var webpack = require('webpack');
var merge = require('lodash/merge');

var srcPath = path.join(__dirname, 'src');
var distPath = path.join(__dirname, 'dist');
var isDev = (process.env.NODE_ENV === 'development');
var nodeEnv = isDev ? 'development' : 'production';
var preprocessParams = '?NODE_ENV=' + nodeEnv;

if (isDev) {
    distPath = path.join(__dirname, 'samples', 'dist');
    preprocessParams = '?+DEBUG&NODE_ENV=' + nodeEnv;
}

var params = {
    'debug': isDev,
    'devtool': isDev ? 'eval' : undefined,
    'target': 'web',
    'entry': {
        'xblocks-core': './xblocks.js',
        'xtag': './xtag.js'
    },
    'context': srcPath,
    'output': {
        'filename': '[name].js',
        'library': '[name]',
        'libraryTarget': 'umd',
        'path': distPath
    },
    'externals': {
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
    'plugins': [
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(nodeEnv),
            'process.env.NODE_ENV': JSON.stringify(nodeEnv),
            'process.env': {
                'NODE_ENV': JSON.stringify(nodeEnv)
            }
        })
    ]
};

var runs = [
    params
];

if (!isDev) {
    runs.push(merge({}, params, {
        'output': {
            'filename': '[name].min.js',
        },
        'plugins': [
            new webpack.DefinePlugin({
                'NODE_ENV': JSON.stringify(nodeEnv),
                'process.env.NODE_ENV': JSON.stringify(nodeEnv),
                'process.env': {
                    'NODE_ENV': JSON.stringify(nodeEnv)
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                'output': {
                    'comments': false
                },
                'compress': {
                    'warnings': false
                }
            })
        ],
        'devtool': '#source-map'
    }));
}

module.exports = runs;
