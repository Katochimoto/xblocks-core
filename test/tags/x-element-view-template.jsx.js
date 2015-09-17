'use strict';

var xblocks = require('../../src/xblocks');

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
