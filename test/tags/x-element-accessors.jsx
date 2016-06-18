var xblocks = require('../../src/xblocks');

xblocks.view.register('x-element-accessors', {
    propTypes: {
        'test1': React.PropTypes.string
    },

    render: function() {
        return (
            <div>
                {this.props.test1}
            </div>
        );
    }
});

xblocks.create('x-element-accessors', {
    accessors: {
        test1: {
            get: function () {
                return this._test1;
            },
            set: function (nextValue) {
                this._test1 = nextValue;
            }
        },

        test2: {
            get: function () {
                return this._test2;
            },
            set: function (nextValue) {
                this._test2 = nextValue;
            }
        }
    }
});
