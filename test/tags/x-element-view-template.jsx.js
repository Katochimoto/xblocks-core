/* global React, xv */
/* jshint strict: false */

'use strict';

xblocks.view.register('x-element-view-template', {
    render: function render() {
        return React.createElement(
            'div',
            null,
            this.template('test')
        );
    }
});

xblocks.create('x-element-view-template');
