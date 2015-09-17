'use strict';

var xblocks = require('../../src/xblocks');

xblocks.view.register('x-element-clone', {
    render: function render() {
        return React.createElement('div', null);
    }
});

xblocks.create('x-element-clone');
