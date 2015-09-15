var path = require('path');

module.exports = {
    'context': path.join(__dirname, 'src'),
    'output': {
        'path': path.join(__dirname, 'dist'),
        'library': 'xblocks',
        'libraryTarget': 'umd'
    },
    'externals': {
        'react': 'React',
        'xtag': 'xtag'
    },
    'resolve': {
        'alias': {
            'setImmediate': 'setImmediate2/src/index.js'
        }
    }
};
