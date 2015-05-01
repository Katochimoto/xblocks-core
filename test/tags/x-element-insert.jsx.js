/** @jsx React.DOM */
/* global React, xv */
/* jshint strict: false */

xblocks.view.register('x-element-insert', {
    propTypes: {
        'bool-attr': React.PropTypes.bool,
        'number-attr': React.PropTypes.number
    },

    render: function() {
        return (
            React.createElement("div", null)
        );
    }
});

xblocks.create('x-element-insert');
