/**
 * @module xblocks-core/view
 */

import React, { PropTypes } from 'react';
import merge from 'lodash/merge';
import mergeWith from 'lodash/mergeWith';
import spread from 'lodash/spread';
import castArray from 'lodash/castArray';
import isArray from 'lodash/isArray';
import isFunction from 'lodash/isFunction';
import isPlainObject from 'lodash/isPlainObject';
import wrap from 'lodash/wrap';
import get from 'lodash/get';
import intersection from 'lodash/intersection';
import keys from 'lodash/keys';
import Constants from './constants';

const spreadMergeWith = spread(mergeWith);

const METHODS_INHERITANCE = [
    'componentWillMount',
    'componentDidMount',
    'componentWillReceiveProps',
    'componentWillUpdate',
    'componentDidUpdate',
    'componentWillUnmount'
];

const METHODS_MERGE_RESULT = [
    'getInitialState',
    'getDefaultProps'
];

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
    component = castArray(component);
    component.unshift({}, VIEW_COMMON_USER);
    component.push(VIEW_COMMON, mergeCustomizer);
    component = spreadMergeWith(component);

    return React.createClass(component);
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
 * @throws Specified item "${blockName}" is already defined
 */
export function register(blockName, component) {
    if (React.DOM.hasOwnProperty(blockName)) {
        throw new Error(`Specified item "${blockName}" is already defined`);
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

/**
 * Special handler of merge.
 * Arrays are merged by the concatenation.
 * @example
 * _.mergeWith(obj, src, mergeCustomizer);
 * @param {*} objValue
 * @param {*} srcValue
 * @param {string} key
 * @returns {Object|array|undefined}
 * @throws The following methods are overridden
 * @throws The "render" method you can override
 * @throws The "displayName" property can not be redefined
 * @private
 */
function mergeCustomizer(objValue, srcValue, key) {
    if (isArray(objValue)) {
        return objValue.concat(srcValue);
    }

    if (METHODS_INHERITANCE.indexOf(key) !== -1) {
        return wrap(objValue, wrap(srcValue, wrapperFunction));
    }

    if (METHODS_MERGE_RESULT.indexOf(key) !== -1) {
        return wrap(objValue, wrap(srcValue, wrapperMergeResult));
    }

    if (key === 'shouldComponentUpdate') {
        return wrap(objValue, wrap(srcValue, wrapperOrResult));
    }

    if (key === 'statics') {
        const overriddenMethods = intersection(keys(objValue), keys(srcValue));

        if (overriddenMethods.length) {
            throw new Error(`The following methods are overridden: "${overriddenMethods.join('", "')}"`);
        }
    }

    if (key === 'render' && objValue && srcValue) {
        throw new Error('The "render" method you can override');
    }

    if (key === 'displayName' && objValue && srcValue) {
        throw new Error('The "displayName" property can not be redefined');
    }

    if (isFunction(objValue) && isFunction(srcValue)) {
        throw new Error(`The following methods are overridden: "${key}"`);
    }
}

/**
 * Implementation of inherited function.
 * @example
 * // call objFunc, srcFunc
 * _.wrap(objFunc, _.wrap(srcFunc, wrapperFunction));
 * @param {function} [srcFunc]
 * @param {function} [objFunc]
 * @param {...*} args
 * @private
 */
function wrapperFunction(srcFunc, objFunc, ...args) {
    if (isFunction(objFunc)) {
        objFunc.apply(this, args);
    }

    if (isFunction(srcFunc)) {
        srcFunc.apply(this, args);
    }
}

/**
 * The implementation of the merger result.
 * @example
 * // call objFunc, srcFunc
 * _.wrap(objFunc, _.wrap(srcFunc, wrapperMergeResult));
 * @param {function} [srcFunc]
 * @param {function} [objFunc]
 * @param {...*} args
 * @returns {Object}
 * @private
 */
function wrapperMergeResult(srcFunc, objFunc, ...args) {
    let resultObjFunction = {};
    let resultSrcFunction = {};

    if (isFunction(objFunc)) {
        resultObjFunction = objFunc.apply(this, args);
    }

    if (isFunction(srcFunc)) {
        resultSrcFunction = srcFunc.apply(this, args);
    }

    return merge({}, resultObjFunction, resultSrcFunction);
}

/**
 * Merging the result of the logical "or".
 * @example
 * // call objFunc, srcFunc
 * _.wrap(objFunc, _.wrap(srcFunc, wrapperOrResult));
 * @param {function} [srcFunc]
 * @param {function} [objFunc]
 * @param {...*} args
 * @returns {boolean}
 * @private
 */
function wrapperOrResult(srcFunc, objFunc, ...args) {
    let resultObjFunction = false;
    let resultSrcFunction = false;

    if (isFunction(objFunc)) {
        resultObjFunction = objFunc.apply(this, args);
    }

    if (isFunction(srcFunc)) {
        resultSrcFunction = srcFunc.apply(this, args);
    }

    return resultObjFunction || resultSrcFunction;
}
