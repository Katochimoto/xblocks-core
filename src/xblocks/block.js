import * as xtag from 'xtag';
import isPlainObject from 'lodash/isPlainObject';
import isArray from 'lodash/isArray';
import merge from 'lodash/merge';
import uniqueId from 'lodash/uniqueId';
import * as dom from './dom';
import { XBElement } from './element';
import { lazy, propTypes } from './utils';

const blockCommon = {
    lifecycle: {
        created: function () {
            blockInit(this);
        },

        inserted: function () {
            if (this.xinserted) {
                return;
            }

            blockInit(this);

            this.xinserted = true;

            var isScriptContent = Boolean(this.querySelector('script'));

            // asynchronous read content
            // <xb-test><script>...</script><div>not found</div></xb-test>
            if (isScriptContent) {
                lazy(blockCreateLazy, this);

            } else {
                blockCreate(this);
            }
        },

        removed: function () {
            this.xinserted = false;

            if (this.xblock) {
                this.xblock.destroy();
                this.xblock = undefined;
            }
        }
    },

    accessors: {
        // check mounted react
        mounted: {
            get: function () {
                return Boolean(this.xblock && this.xblock.isMounted());
            }
        },

        content: {
            get: function () {
                if (this.mounted) {
                    return this.xblock.getMountedContent();
                }

                return dom.contentNode(this).innerHTML;
            },

            set: function (content) {
                if (this.mounted) {
                    this.xblock.setMountedContent(content);

                } else {
                    dom.contentNode(this).innerHTML = content;
                    this.upgrade();
                }
            }
        },

        // getting object attributes
        attrs: {
            get: function () {
                return dom.attrs.toObject(this);
            }
        },

        props: {
            get: function () {
                var prop;
                var props = dom.attrs.toObject(this);
                var xprops = this.xprops;
                var eprops = xtag.tags[ this.xtagName ].accessors;
                var common = blockCommon.accessors;

                for (prop in eprops) {
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
            get: function () {
                return propTypes(this.xtagName);
            }
        },

        outerHTML: dom.outerHTML
    },

    methods: {
        upgrade: function () {
            dom.upgradeAll(this);
        },

        cloneNode: function (deep) {
            // not to clone the contents
            var node = dom.cloneNode(this, false);
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
 * @see http://x-tags.org/docs
 * @param {string} blockName the name of the new node
 * @param {?Object|array} options settings tag creation
 * @returns {HTMLElement}
 * @public
 */
export function create(blockName, options) {
    options = isArray(options) ? options : [ options ];
    options.unshift({});
    options.push(blockCommon);

    // error when merging prototype in FireFox <=19
    var proto;
    var o;
    var i = 1;
    var l = options.length;

    for (; i < l; i++) {
        o = options[ i ];

        if (isPlainObject(o)) {
            if (!proto && o.prototype) {
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
 * @private
 */
function tmplCompileIterator(node) {
    this.xtmpl[ node.getAttribute('ref') ] = node.innerHTML;
}
