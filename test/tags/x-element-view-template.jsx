var xblocks = require('../../src/xblocks');

xblocks.view.register('x-element-view-template', {
    render: function() {
        return (
            <div>{this.template('test')}</div>
        );
    }
});

xblocks.create('x-element-view-template');
