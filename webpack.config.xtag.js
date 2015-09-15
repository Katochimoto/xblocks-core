var path = require('path');

module.exports = {
    'context': path.join(__dirname, 'src'),
    'output': {
        'path': path.join(__dirname, 'dist')
    },
    'resolve': {
        'alias': {
            'handjs': 'handjs/hand.base.js',
            'MutationObserver': 'webcomponents.js/src/MutationObserver/MutationObserver.js',
            'token-list': 'dom-token-list-polyfill/src/token-list.js',
            'WeakMap': 'webcomponents.js/src/WeakMap/WeakMap.js',
            'x-tag-core': 'x-tag-core/src/core.js'
        }
    }
};
