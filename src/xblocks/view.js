import React, { PropTypes } from 'react';
import merge from 'lodash/merge';
import isArray from 'lodash/isArray';

const viewCommon = {

    /**
     * Required attributes.
     * @memberOf ReactElement.prototype
     * @type {Object}
     */
    propTypes: {
        _uid: PropTypes.node,
        _container: PropTypes.any,  // Bad way ;(
        children: PropTypes.node
    },

    /**
     * Create node by template.
     * @memberOf ReactElement.prototype
     * @param {string} ref template name
     * @param {Object} [props] the attributes of a node
     * @returns {?ReactElement}
     */
    template: function (ref, props) {
        var xtmpl = this.props._container && this.props._container.xtmpl;

        if (typeof xtmpl === 'object' && xtmpl !== null && xtmpl.hasOwnProperty(ref)) {
            return (
                <div {...props} dangerouslySetInnerHTML={{ '__html': this.templatePrepare(xtmpl[ ref ]) }} />
            );
        }

        return null;
    },

    /**
     * Get the node associated with the view.
     * @returns {HTMLElement}
     */
    container: function () {
        return this.props._container;
    }
};

const viewCommonUser = {
    templatePrepare: function (tmplString) {
        return tmplString;
    }
};

var viewComponentsClass = {};

/**
 * Create class view node.
 *
 * @example
 * var view = require('./view');
 *
 * var XBButtonContent = view.create({
 *     'displayName': 'XBButtonContent',
 *     'render': function () {
 *         return (
 *             &lt;span {...this.props}&gt;{this.props.children}&lt;/span&gt;
 *         );
 *     }
 * });
 *
 * view.register('xb-button', {
 *     'displayName': 'xb-button',
 *     'render': function () {
 *         return (
 *             &lt;button&gt;
 *                 &lt;XBButtonContent {...this.props} /&gt;
 *             &lt;/button&gt;
 *         );
 *     }
 * });
 *
 * @see http://facebook.github.io/react/docs/component-specs.html
 * @param {Object|array} component settings view creation
 * @returns {function}
 */
export function create(component) {
    component = isArray(component) ? component : [ component ];
    component.unshift({}, viewCommonUser);
    component.push(viewCommon);

    return React.createClass(merge.apply({}, component));
}

/**
 * Registration of a new node.
 *
 * @example
 * var view = require('./view');
 * view.register('xb-button', {
 *     'displayName': 'xb-button',
 *     'render': function () {
 *         return (
 *             &lt;button {...this.props}&gt;{this.props.children}&lt;/button&gt;
 *         );
 *     }
 * });
 *
 * @see http://facebook.github.io/react/docs/component-specs.html
 * @param {string} blockName the name of the new node
 * @param {Object|array} component settings view creation
 * @returns {function}
 */
export function register(blockName, component) {
    if (React.DOM.hasOwnProperty(blockName)) {
        /* eslint no-throw-literal:0 */
        throw 'Specified item "' + blockName + '" is already defined';
    }

    var componentClass = create(component);
    viewComponentsClass[ blockName ] = componentClass;

    React.DOM[ blockName ] = React.createFactory(componentClass);

    return componentClass;
}

/**
 * Get factory view node.
 * @param {string} blockName the name of the new node
 * @returns {function}
 */
export function getFactory(blockName) {
    return React.DOM[ blockName ];
}

/**
 * Get class view node.
 * @param {string} blockName the name of the new node
 * @returns {function}
 */
export function getClass(blockName) {
    return viewComponentsClass[ blockName ];
}
