var path = require('path');

module.exports = {
    'context': path.join(__dirname, 'src'),
    'entry': './xblocks',
    'output': {
        'path': path.join(__dirname, 'dist'),
        'filename': 'xblocks-core.js'
    },
    'externals': {
        'react': 'React',
        'xtag': 'xtag'
    },
    'resolve': {
        'alias': {
            'setImmediate': 'setImmediate2/dist/setImmediate.js'
        }
    }
};
