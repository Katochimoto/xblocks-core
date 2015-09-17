var xblocks = require('../../src/xblocks.js');

xblocks.view.register('x-element-clone', {
    render: function() {
        return (
            <div />
        );
    }
});

xblocks.create('x-element-clone');
