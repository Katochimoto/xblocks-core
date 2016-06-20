/**
 * @module xblocks-core/block
 */

import * as xtag from 'xtag';
import forEach from 'lodash/forEach';
import isFunction from 'lodash/isFunction';
import stubFalse from 'lodash/stubFalse';
import merge from 'lodash/merge';
import assign from 'lodash/assign';
import mergeWith from 'lodash/mergeWith';
import uniqueId from 'lodash/uniqueId';
import spread from 'lodash/spread';
import castArray from 'lodash/castArray';
import isArray from 'lodash/isArray';
import get from 'lodash/get';
import wrap from 'lodash/wrap';
import invoke from 'lodash/invoke';
import intersection from 'lodash/intersection';
import keys from 'lodash/keys';
import * as dom from './dom';
import { XBElement } from './element';
import { lazy, propTypes } from './utils';
import Constants from './constants';

const spreadMergeWith = spread(mergeWith);

const BLOCK_COMMON_ACCESSORS = {
    mounted: {
        /**
         * Check react mounted
         * @returns {boolean}
         * @readonly
         */
        get: function () {
            return Boolean(invoke(this, [ Constants.BLOCK, 'isMounted' ]));
        }
    },

    content: {
        /**
         * Receiving the content.
         * @returns {?string}
         */
        get: function () {
            if (this.mounted) {
                return invoke(this, [ Constants.BLOCK, 'getMountedContent' ]);
            }

            return dom.contentNode(this).innerHTML;
        },

        /**
         * Installing a new content.
         * @param {string} content
         */
        set: function (content) {
            if (this.mounted) {
                invoke(this, [ Constants.BLOCK, 'setMountedContent' ], content);

            } else {
                dom.contentNode(this).innerHTML = content;
                this.upgrade();
            }
        }
    },

    attrs: {
        /**
         * Getting object attributes.
         * @returns {Object}
         * @readonly
         */
        get: function () {
            return dom.attrs.toObject(this);
        }
    },

    props: {
        /**
         * Getting object properties.
         * @returns {Object}
         * @readonly
         */
        get: function () {
            const props = dom.attrs.toObject(this);
            const xprops = this.xprops;
            const eprops = get(xtag, [ 'tags', this[ Constants.TAGNAME ], 'accessors' ], {});

            for (let prop in eprops) {
                if (xprops.hasOwnProperty(prop) &&
                    eprops.hasOwnProperty(prop) &&
                    !BLOCK_COMMON_ACCESSORS.hasOwnProperty(prop)) {

                    props[ prop ] = this[ prop ];
                }
            }

            dom.attrs.typeConversion(props, xprops);
            return props;
        }
    },

    xprops: {
        /**
         * Getting react properties.
         * @returns {Object}
         * @readonly
         */
        get: function () {
            return propTypes(this[ Constants.TAGNAME ]);
        }
    },

    outerHTML: dom.outerHTML
};

const BLOCK_COMMON_METHODS = {
    /**
     * Obtaining the React components.
     * @returns {?Constructor}
     */
    getComponent: function () {
        return invoke(this, [ Constants.BLOCK, 'getMountedComponent' ]);
    },

    /**
     * Recalculation of the internal structure.
     */
    upgrade: function () {
        dom.upgradeAll(this);
    },

    /**
     * Cloning a node.
     * @param {boolean} deep true if the content to be saved
     * @returns {HTMLElement}
     */
    cloneNode: function (deep) {
        // not to clone the contents
        const node = dom.cloneNode(this, false);
        dom.upgrade(node);

        node[ Constants.TMPL ] = this[ Constants.TMPL ];
        node[ Constants.INSERTED ] = false;

        if (deep) {
            node.content = this.content;
        }

        // ???
        // if ('checked' in this) clone.checked = this.checked;

        return node;
    }
};

/**
 * Creating a new tag.
 * @see http://x-tag.github.io/
 * @alias module:xblocks-core/block.create
 * @param {string} blockName the name of the new node
 * @param {?Object|array} options settings tag creation
 * @returns {HTMLElement}
 * @public
 */
export function create(blockName, options) {
    options = castArray(options);
    options.unshift({ lifecycle: { created: lifecycleCreated, inserted: lifecycleInserted } });
    options.push(mergeCustomizer);
    options = spreadMergeWith(options);

    forEach(options.accessors, accessorsIterator);

    options.accessors = assign(options.accessors, BLOCK_COMMON_ACCESSORS);
    options.methods = assign(options.methods, BLOCK_COMMON_METHODS);

    // "removed" should be called after user handler
    options.lifecycle.removed = wrap(options.lifecycle.removed, wrap(lifecycleRemoved, wrapperFunction));

    return xtag.register(blockName, options);
}

/**
 * Initialization of the element.
 * @example
 * blockInit(node);
 * @param {HTMLElement} node
 * @returns {boolean}
 * @private
 */
function blockInit(node) {
    if (!node[ Constants.TAGNAME ]) {
        node[ Constants.INSERTED ] = false;
        node[ Constants.TAGNAME ] = node.tagName.toLowerCase();
        node[ Constants.TMPL ] = {};
        node[ Constants.UID ] = uniqueId();

        return true;
    }

    return false;
}

/**
 * Creating an item.
 * @example
 * blockCreate(node);
 * @param {HTMLElement} node
 * @private
 */
function blockCreate(node) {
    if (node.hasChildNodes()) {
        Array.prototype.forEach.call(
            node.querySelectorAll('script[type="text/x-template"][ref],template[ref]'),
            tmplCompileIterator,
            node
        );
    }

    node[ Constants.BLOCK ] = new XBElement(node);
}

/**
 * Pending the creation of the item.
 * @example
 * blockCreateLazy([ node1, node2, ... ]);
 * @param {HTMLElement[]} nodes
 * @private
 */
function blockCreateLazy(nodes) {
    nodes.forEach(blockCreate);
}

/**
 * The selection of templates.
 * @example
 * // append template to node
 * tmplCompileIterator.call(node, tmplNode);
 * @param {HTMLElement} node
 * @this HTMLElement
 * @private
 */
function tmplCompileIterator(node) {
    this[ Constants.TMPL ][ node.getAttribute('ref') ] = node.innerHTML;
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
 * @private
 */
function mergeCustomizer(objValue, srcValue, key) {
    if (isArray(objValue)) {
        return objValue.concat(srcValue);
    }

    if (key === 'lifecycle') {
        return mergeWith(objValue, srcValue, lifecycleCustomizer);
    }

    if (key === 'events') {
        return mergeWith(objValue, srcValue, eventsCustomizer);
    }

    if (key === 'accessors') {
        return mergeWith(objValue, srcValue, accessorsCustomizer);
    }

    if (key === 'methods') {
        const overriddenMethods = intersection(keys(objValue), keys(srcValue));

        if (overriddenMethods.length) {
            throw new Error(`The following methods are overridden: "${overriddenMethods.join('", "')}"`);
        }
    }
}

/**
 * Inheritance lifecycle handler.
 * @example
 * _.mergeWith(objValue, srcValue, lifecycleCustomizer);
 * @param {function} [objValue] the current handler
 * @param {function} [srcValue] the new handler
 * @returns {function}
 * @private
 */
function lifecycleCustomizer(objValue, srcValue) {
    return wrap(objValue, wrap(srcValue, wrapperFunction));
}

/**
 * Inheritance event handler.
 * @example
 * _.mergeWith(objValue, srcValue, eventsCustomizer);
 * @param {function} [objValue] the current handler
 * @param {function} [srcValue] the new handler
 * @returns {function}
 * @private
 */
function eventsCustomizer(objValue, srcValue) {
    return wrap(objValue, wrap(srcValue, wrapperEvents));
}

/**
 * Inheritance events "set" property changes.
 * @example
 * _.mergeWith(objValue, srcValue, accessorsCustomizer);
 * @param {Object} [objValue] the current value
 * @param {Object} [srcValue] the new value
 * @returns {Object}
 * @private
 */
function accessorsCustomizer(objValue, srcValue) {
    const objSetter = get(objValue, 'set');
    const srcSetter = get(srcValue, 'set');

    return merge({}, objValue, srcValue, {
        set: wrap(objSetter, wrap(srcSetter, wrapperFunction))
    });
}

/**
 * Implementation of inherited event.
 * @example
 * // call objFunc, srcFunc
 * _.wrap(objFunc, _.wrap(srcFunc, wrapperEvents));
 * @param {function} [srcFunc]
 * @param {function} [objFunc]
 * @param {...*} args
 * @private
 */
function wrapperEvents(srcFunc, objFunc, ...args) {
    const event = (args[ 0 ] instanceof Event) && args[ 0 ];
    const isStopped = event ? () => event.immediatePropagationStopped : stubFalse;

    if (!isStopped() && isFunction(objFunc)) {
        objFunc.apply(this, args);
    }

    if (!isStopped() && isFunction(srcFunc)) {
        srcFunc.apply(this, args);
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
 * The assignment of parameters accessors.
 * @example
 * _.forEach({}, accessorsIterator);
 * @param {Object} options
 * @param {string} name
 * @param {Object} accessors
 * @private
 */
function accessorsIterator(options, name, accessors) {
    const optionsSetter = get(options, 'set');
    const updateSetter = wrap(name, wrapperAccessorsSetUpdate);

    accessors[ name ] = merge({}, options, {
        set: wrap(optionsSetter, wrap(updateSetter, wrapperFunction))
    });
}

/**
 * Update element when a property is changed.
 * @example
 * // call node.xblock.update();
 * _.wrap("accessor-name", wrapperAccessorsSetUpdate).call(node, 'newValue', 'oldValue');
 * @param {string} accessorName the name of the property
 * @param {*} nextValue
 * @param {*} prevValue
 * @this HTMLElement
 * @private
 */
function wrapperAccessorsSetUpdate(accessorName, nextValue, prevValue) {
    if (nextValue !== prevValue && this.xprops.hasOwnProperty(accessorName) && this.mounted) {
        this[ Constants.BLOCK ].update();
    }
}

/**
 * The callback of the remote in DOM.
 * @this HTMLElement
 * @private
 */
function lifecycleRemoved() {
    this[ Constants.INSERTED ] = false;

    const block = this[ Constants.BLOCK ];

    if (block) {
        block.destroy();
        this[ Constants.BLOCK ] = undefined;
    }
}

/**
 * The callback of the create element.
 * @this HTMLElement
 * @private
 */
function lifecycleCreated() {
    blockInit(this);
}

/**
 * The callback of the insert in DOM.
 * @this HTMLElement
 * @private
 */
function lifecycleInserted() {
    if (this[ Constants.INSERTED ]) {
        return;
    }

    blockInit(this);

    this[ Constants.INSERTED ] = true;

    const isScriptContent = Boolean(this.querySelector('script'));

    // asynchronous read content
    // <xb-test><script>...</script><div>not found</div></xb-test>
    if (isScriptContent) {
        lazy(blockCreateLazy, this);

    } else {
        blockCreate(this);
    }
}
