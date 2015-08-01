/* global React, xv */
/* jshint strict: false */

'use strict';

xblocks.view.register('x-element-clone', {
    render: function render() {
        return React.createElement('div', null);
    }
});

xblocks.create('x-element-clone');
