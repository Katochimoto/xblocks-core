/** @jsx React.DOM */
/* global React, xv */
/* jshint strict: false */

xblocks.view.register('x-element-update', {
    propTypes: {
        'bool-attr': React.PropTypes.bool,
        'number-attr': React.PropTypes.number
    },

    render: function() {
        var classes = {};

        if (this.props[ 'bool-attr' ]) {
            classes[ 'bool' ] = true;
        }

        classes = classNames(classes);

        return (
            <div className={classes} />
        );
    }
});

xblocks.create('x-element-update');
