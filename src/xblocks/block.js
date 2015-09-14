'use strict';

var dom = require('./dom');
var utils = require('./utils');
var Element = require('./element');
var xtag = require('xtag');
var forEach = Array.prototype.forEach;

var blockStatic = {
    init: function(node) {
        if (!node.xtagName) {
            node.xtagName = node.tagName.toLowerCase();
            node.xtmpl = {};
            node.xuid = utils.seq();
            node.xprops = utils.propTypes(node.xtagName);
            node.xinserted = false;
            return true;
        }

        return false;
    },

    tmplCompile: function(tmplNode) {
        this.xtmpl[ tmplNode.getAttribute('ref') ] = tmplNode.innerHTML;
    },

    create: function(node) {
        if (node.hasChildNodes()) {
            forEach.call(
                node.querySelectorAll('script[type="text/x-template"][ref],template[ref]'),
                blockStatic.tmplCompile,
                node
            );
        }

        node.xblock = new Element(node);
    },

    createLazy: function(nodes) {
        nodes.forEach(blockStatic.create);
    }
};

var blockCommon = {
    lifecycle: {
        created: function() {
            utils.log.time(this, 'xb_init');
            utils.log.time(this, 'dom_inserted');

            blockStatic.init(this);
        },

        inserted: function() {
            if (this.xinserted) {
                return;
            }

            blockStatic.init(this);

            this.xinserted = true;

            var isScriptContent = Boolean(this.querySelector('script'));

            // asynchronous read content
            // <xb-test><script>...</script><div>not found</div></xb-test>
            if (isScriptContent) {
                utils.lazy(blockStatic.createLazy, this);

            } else {
                blockStatic.create(this);
            }

            utils.log.time(this, 'dom_inserted');
        },

        removed: function() {
            this.xinserted = false;

            // replace initial content after destroy react component
            // fix:
            // element.parentNode.removeChild(element);
            // document.body.appendChild(element);
            if (this.xblock) {
                var content = this.content;
                this.xblock.destroy();
                this.xblock = undefined;
                this.content = content;
            }
        },

        attributeChanged: function(attrName, oldValue, newValue) {
            // removeAttribute('xb-static')
            if (attrName === 'xb-static' &&
                newValue === null &&
                this.xblock &&
                !this.mounted) {

                this.xblock.repaint();
            }
        }
    },

    accessors: {
        // check mounted react
        mounted: {
            get: function() {
                return Boolean(this.xblock && this.xblock.isMounted());
            }
        },

        content: {
            get: function() {
                if (this.mounted) {
                    return this.xblock.getMountedContent();
                }

                return dom.contentNode(this).innerHTML;
            },

            set: function(content) {
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
            get: function() {
                return dom.attrs.toObject(this);
            }
        },

        state: {
            get: function() {
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

        outerHTML: dom.outerHTML
    },

    methods: {
        upgrade: function() {
            dom.upgradeAll(this);
        },

        cloneNode: function(deep) {
            // not to clone the contents
            var node = dom.cloneNode(this, false);
            dom.upgrade(node);

            node.xtmpl = this.xtmpl;
            node.xinserted = false;

            if (deep) {
                node.content = this.content;
            }

            //???
            //if ('checked' in this) clone.checked = this.checked;

            return node;
        }
    }
};

/**
 * Creating a new tag
 *
 * @see http://x-tags.org/docs
 * @param {string} blockName the name of the new node
 * @param {?object|array} options settings tag creation
 * @returns {HTMLElement}
 */
exports.create = function(blockName, options) {
    options = Array.isArray(options) ? options : [ options ];
    options.unshift(true, {});
    options.push(blockCommon);

    // error when merging prototype in FireFox <=19
    var proto;
    var o;
    var i = 2;
    var l = options.length;

    for (; i < l; i++) {
        o = options[ i ];

        if (utils.isPlainObject(o)) {
            if (!proto && o.prototype) {
                proto = o.prototype;
            }

            delete o.prototype;
        }
    }

    options = utils.merge.apply({}, options);

    if (proto) {
        options.prototype = proto;
    }

    return xtag.register(blockName, options);
};
