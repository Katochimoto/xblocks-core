/* global React, xv */
/* jshint strict: false */

xblocks.view.register('x-element', {
    propTypes: {
        'bool-attr': React.PropTypes.bool,
        'number-attr': React.PropTypes.number
    },

    render: function() {
        return (
            <div />
        );
    }
});

xblocks.create('x-element');
