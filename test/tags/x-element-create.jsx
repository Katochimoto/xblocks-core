/** @jsx React.DOM */
/* global React, xv */
/* jshint strict: false */

xblocks.view.register('x-element-create', {
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

xblocks.create('x-element-create');