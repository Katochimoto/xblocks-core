/* global xblocks, global, xtag */
/* jshint strict: false */

/**
 * @param {string} blockName
 * @param {?object} options
 * @returns {HTMLElement}
 */
xblocks.create = function(blockName, options) {
    options = Array.isArray(options) ? options : [options];
    options.unshift(true, {});
    options.push({
        lifecycle: {
            created: function() {
                this.templates = {};
                this.xuid = xblocks.utils.seq();

                if (this.getElementsByTagName('script').length) {
                    xblocks.utils.lazy(_blockLazyInstantiation, this);

                } else {
                    _blockInstantiation(this);
                }
            },

            inserted: function() {
                // rebuilding after deleting
                if (this.xblock === null) {
                    this.xblock = xblocks.element.create(this);
                }
            },

            removed: function() {
                // replace initial content after destroy react component
                // fix:
                // element.parentNode.removeChild(element);
                // document.body.appendChild(element);
                if (this.xblock) {
                    var content = this.content;
                    this.xblock.destroy();
                    this.xblock = null;
                    this.content = content;
                }
            },

            attributeChanged: function(attrName, oldValue, newValue) {
                // removeAttribute('xb-static')
                if (attrName === xblocks.dom.attrs.XB_ATTRS.STATIC &&
                    newValue === null &&
                    this.xblock &&
                    !this.mounted) {

                    this.xblock._repaint();
                }
            }
        },

        accessors: {
            mounted: {
                get: function() {
                    return (this.xblock && this.xblock._isMountedComponent());
                }
            },

            content: {
                get: function() {
                    if (this.mounted) {
                        // FIXME bad way to get children
                        return this.xblock._component.props.children;
                    }

                    return xblocks.utils.contentNode(this).innerHTML;
                },

                set: function(content) {
                    if (this.mounted) {
                        this.xblock.update({ children: content });

                    } else {
                        xblocks.utils.contentNode(this).innerHTML = content;
                        this.upgrade();
                    }
                }
            },

            attrs: {
                get: function() {
                    return xblocks.dom.attrs.toObject(this);
                }
            }
        },

        methods: {
            upgrade: function() {
                xblocks.utils.upgradeElements(this);
            },

            cloneNode: function(deep) {
                // not to clone the contents
                var node = Node.prototype.cloneNode.call(this, false);
                node.templates = this.templates;

                if (deep) {
                    node.content = this.content;
                }

                return node;
            }
        }
    });

    return xtag.register(blockName, xblocks.utils.merge.apply({}, options));
};

function _blockTmplCompile(tmplElement) {
    this.templates[tmplElement.getAttribute('ref')] = xblocks.tmpl.compile(tmplElement.innerHTML);
}

function _blockInstantiation(element) {
    if (element.hasChildNodes()) {
        Array.prototype.forEach.call(
            element.querySelectorAll('script[type="text/x-template"][ref],template[ref]'),
            _blockTmplCompile,
            element
        );
    }

    element.xblock = xblocks.element.create(element);
}

function _blockLazyInstantiation(elements) {
    elements.forEach(_blockInstantiation);
}
