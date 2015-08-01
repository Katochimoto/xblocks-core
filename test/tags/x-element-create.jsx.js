/* global React, xv */
/* jshint strict: false */

'use strict';

xblocks.view.register('x-element-create', {
    propTypes: {
        'bool-attr': React.PropTypes.bool,
        'number-attr': React.PropTypes.number
    },

    render: function render() {
        return React.createElement('div', null);
    }
});

xblocks.create('x-element-create');
