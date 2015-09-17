'use strict';

var xblocks = require('../../src/xblocks');

xblocks.view.register('x-element-update', {
    propTypes: {
        'bool-attr': React.PropTypes.bool,
        'number-attr': React.PropTypes.number
    },

    render: function render() {
        var classes = {};

        if (this.props['bool-attr']) {
            classes['bool'] = true;
        }

        classes = classNames(classes);

        return React.createElement('div', { className: classes });
    }
});

xblocks.create('x-element-update');
