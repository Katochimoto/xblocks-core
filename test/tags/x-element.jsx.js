'use strict';

var xblocks = require('../../src/xblocks');

xblocks.view.register('x-element', {
    propTypes: {
        'bool-attr': React.PropTypes.bool,
        'number-attr': React.PropTypes.number
    },

    render: function render() {
        return React.createElement('div', null);
    }
});

xblocks.create('x-element');
