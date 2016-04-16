var xblocks = require('../../src/xblocks');

xblocks.view.register('x-element1', {
    render: function() {
        return (
            <div>
                <div data-xb-content={this.props._uid}>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

xblocks.create('x-element1');
