/**
 * @module xblocks/block
 */

import * as xtag from 'xtag';
import isPlainObject from 'lodash/isPlainObject';
import isArray from 'lodash/isArray';
import merge from 'lodash/merge';
import uniqueId from 'lodash/uniqueId';
import * as dom from './dom';
import { XBElement } from './element';
import { lazy, propTypes } from './utils';

const BLOCK_COMMON = {
    lifecycle: {
        /**
         * The callback of the create element.
         */
        created: function () {
            blockInit(this);
        },

        /**
         * The callback of the insert in DOM.
         */
        inserted: function () {
            if (this.xinserted) {
                return;
            }

            blockInit(this);

            this.xinserted = true;

            const isScriptContent = Boolean(this.querySelector('script'));

            // asynchronous read content
            // <xb-test><script>...</script><div>not found</div></xb-test>
            if (isScriptContent) {
                lazy(blockCreateLazy, this);

            } else {
                blockCreate(this);
            }
        },

        /**
         * The callback of the remote in DOM.
         */
        removed: function () {
            this.xinserted = false;

            if (this.xblock) {
                this.xblock.destroy();
                this.xblock = undefined;
            }
        }
    },

    accessors: {
        mounted: {
            /**
             * Check react mounted
             * @returns {boolean}
             */
            get: function () {
                return Boolean(this.xblock && this.xblock.isMounted());
            }
        },

        content: {
            /**
             * Receiving the content.
             * @returns {?string}
             */
            get: function () {
                if (this.mounted) {
                    return this.xblock.getMountedContent();
                }

                return dom.contentNode(this).innerHTML;
            },

            /**
             * Installing a new content.
             * @param {string} content
             */
            set: function (content) {
                if (this.mounted) {
                    this.xblock.setMountedContent(content);

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
             */
            get: function () {
                return dom.attrs.toObject(this);
            }
        },

        props: {
            /**
             * Getting object properties.
             * @returns {Object}
             */
            get: function () {
                const props = dom.attrs.toObject(this);
                const xprops = this.xprops;
                const eprops = xtag.tags[ this.xtagName ].accessors;
                const common = BLOCK_COMMON.accessors;

                for (let prop in eprops) {
                    if (xprops.hasOwnProperty(prop) &&
                        eprops.hasOwnProperty(prop) &&
                        !common.hasOwnProperty(prop)) {

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
             */
            get: function () {
                return propTypes(this.xtagName);
            }
        },

        outerHTML: dom.outerHTML
    },

    methods: {
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

            node.xtmpl = this.xtmpl;
            node.xinserted = false;

            if (deep) {
                node.content = this.content;
            }

            // ???
            // if ('checked' in this) clone.checked = this.checked;

            return node;
        }
    }
};

/**
 * Creating a new tag.
 * @see http://x-tag.github.io/
 * @alias module:xblocks/block.create
 * @param {string} blockName the name of the new node
 * @param {?Object|array} options settings tag creation
 * @returns {HTMLElement}
 * @public
 */
export function create(blockName, options) {
    options = isArray(options) ? options : [ options ];
    options.unshift({});
    options.push(BLOCK_COMMON);

    // error when merging prototype in FireFox <=19
    let proto;
    let i = 1;
    const l = options.length;

    for (; i < l; i++) {
        let o = options[ i ];

        if (isPlainObject(o) && o.prototype) {
            if (!proto) {
                proto = o.prototype;
            }

            delete o.prototype;
        }
    }

    options = merge.apply({}, options);

    if (proto) {
        options.prototype = proto;
    }

    return xtag.register(blockName, options);
}

/**
 * Initialization of the element.
 * @param {HTMLElement} node
 * @returns {boolean}
 * @private
 */
function blockInit(node) {
    if (!node.xtagName) {
        node.xtagName = node.tagName.toLowerCase();
        node.xtmpl = {};
        node.xuid = uniqueId();
        node.xinserted = false;
        return true;
    }

    return false;
}

/**
 * Creating an item.
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

    node.xblock = new XBElement(node);
}

/**
 * Pending the creation of the item.
 * @param {HTMLElement[]} nodes
 * @private
 */
function blockCreateLazy(nodes) {
    nodes.forEach(blockCreate);
}

/**
 * The selection of templates.
 * @param {HTMLElement} node
 * @this HTMLElement
 * @private
 */
function tmplCompileIterator(node) {
    this.xtmpl[ node.getAttribute('ref') ] = node.innerHTML;
}
