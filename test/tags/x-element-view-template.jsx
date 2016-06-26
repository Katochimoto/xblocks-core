var xblocks = require('../../src/xblocks');

xblocks.view.register('x-element-view-template', {
    render: function() {
        return (
            <div>{this.context.template('test')}</div>
        );
    }
});

xblocks.create('x-element-view-template');
