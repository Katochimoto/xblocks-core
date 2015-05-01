/** @jsx React.DOM */
/* global React, xv */
/* jshint strict: false */

xblocks.view.register('x-element-view-template', {
    render: function() {
        return (
            React.createElement("div", null, this.template('test'))
        );
    }
});

xblocks.create('x-element-view-template');
