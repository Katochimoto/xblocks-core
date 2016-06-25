var xblocks = require('../../src/xblocks');

xblocks.view.register('x-element1', {
    render: function() {
        return (
            <div>
                {this.context.content()}
            </div>
        );
    }
});

xblocks.create('x-element1');
