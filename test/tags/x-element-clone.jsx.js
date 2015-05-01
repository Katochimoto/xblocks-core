/** @jsx React.DOM */
/* global React, xv */
/* jshint strict: false */

xblocks.view.register('x-element-clone', {
    render: function() {
        return (
            React.createElement("div", null)
        );
    }
});

xblocks.create('x-element-clone');
