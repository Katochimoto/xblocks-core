/** @jsx React.DOM */
/* global React, xv */
/* jshint strict: false */

xblocks.view.register('x-element-view-template', {
    render: function() {
        return (
            <div>{this.template('test')}</div>
        );
    }
});

xblocks.create('x-element-view-template');
