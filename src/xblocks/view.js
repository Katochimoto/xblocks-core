/**
 * @module xblocks-core/view
 */

import React, { PropTypes } from 'react';
import merge from 'lodash/merge';
import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';
import isPlainObject from 'lodash/isPlainObject';
import get from 'lodash/get';
import Constants from './constants';

const VIEW_COMMON = {

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
        const templates = get(this, [ 'props', '_container', Constants.TMPL ]);

        if (isPlainObject(templates) && templates.hasOwnProperty(ref)) {
            return (
                <div {...props} dangerouslySetInnerHTML={{ '__html': this.templatePrepare(templates[ ref ]) }} />
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

const VIEW_COMMON_USER = {
    /**
     * Custom conversion template.
     * @param {string} tmplString
     * @returns {string}
     */
    templatePrepare: function (tmplString) {
        return tmplString;
    }
};

const VIEW_COMPONENTS_CLASS = {};

/**
 * Create class view node.
 *
 * @example
 * import view from 'xblocks-core/view';
 *
 * var XBButtonContent = view.create({
 *     displayName: 'XBButtonContent',
 *     render: function () {
 *         return (
 *             <span {...this.props}>{this.props.children}</span>
 *         );
 *     }
 * });
 *
 * view.register('xb-button', {
 *     displayName: 'xb-button',
 *     render: function () {
 *         return (
 *             <button>
 *                 <XBButtonContent {...this.props} />
 *             </button>
 *         );
 *     }
 * });
 *
 * @see http://facebook.github.io/react/docs/component-specs.html
 * @alias module:xblocks-core/view.create
 * @param {Object|array} component settings view creation
 * @returns {function}
 */
export function create(component) {
    component = isArray(component) ? component : [ component ];
    component.unshift({}, VIEW_COMMON_USER);
    component.push(VIEW_COMMON);

    return React.createClass(merge.apply({}, component));
}

/**
 * Registration of a new node.
 *
 * @example
 * import view from 'xblocks-core/view';
 * view.register('xb-button', {
 *     displayName: 'xb-button',
 *     render: function () {
 *         return (
 *             <button {...this.props}>{this.props.children}</button>
 *         );
 *     }
 * });
 *
 * @see http://facebook.github.io/react/docs/component-specs.html
 * @alias module:xblocks-core/view.register
 * @param {string} blockName the name of the new node
 * @param {Object|array|React.Component} component settings view creation
 * @returns {function}
 */
export function register(blockName, component) {
    if (React.DOM.hasOwnProperty(blockName)) {
        /* eslint no-throw-literal:0 */
        throw 'Specified item "' + blockName + '" is already defined';
    }

    const componentClass = isFunction(component) ?
        component :
        create(component);

    VIEW_COMPONENTS_CLASS[ blockName ] = componentClass;

    React.DOM[ blockName ] = React.createFactory(componentClass);

    return componentClass;
}

/**
 * Get factory view node.
 * @alias module:xblocks-core/view.getFactory
 * @param {string} blockName the name of the new node
 * @returns {function}
 */
export function getFactory(blockName) {
    return React.DOM[ blockName ];
}

/**
 * Get class view node.
 * @alias module:xblocks-core/view.getClass
 * @param {string} blockName the name of the new node
 * @returns {function}
 */
export function getClass(blockName) {
    return VIEW_COMPONENTS_CLASS[ blockName ];
}
