/* global xblocks, global, xtag */
/* jshint strict: false */

/**
 * @param {string} blockName
 * @param {?object} options
 * @returns {HTMLElement}
 */
xblocks.create = function(blockName, options) {
    options = Array.isArray(options) ? options : [options];
    options.unshift(true);
    options.push({
        lifecycle: {
            created: function() {
                this.xuid = xblocks.utils.seq();
                this.xblock = xblocks.element.create(this);
            },

            inserted: function() {
                if (this.xblock === null) {
                    this.xblock = xblocks.element.create(this);
                }
            },

            removed: function() {
                // replace initial content after destroy react component
                // fix:
                // element.parentNode.removeChild(element);
                // document.body.appendChild(element);
                var content = this.content;
                this.xblock.destroy();
                this.xblock = null;
                this.content = content;
            },

            attributeChanged: function(attrName, oldValue, newValue) {
                // removeAttribute('xb-static')
                if (attrName === xblocks.dom.attrs.XB_ATTRS.STATIC &&
                    newValue === null &&
                    this.xblock &&
                    !this.xblock._isMountedComponent()) {

                    this.xblock._repaint();
                }
            }
        },

        accessors: {
            content: {
                /**
                 * @return {string}
                 */
                get: function() {
                    // FIXME
                    if (this.xblock && this.xblock._isMountedComponent()) {
                        return this.xblock._component.props.children;
                    }

                    var contentElement = findNodeContentElement(this);
                    return contentElement.innerHTML;
                },

                /**
                 * @param {string} content
                 */
                set: function(content) {
                    // FIXME
                    if (this.xblock && this.xblock._isMountedComponent()) {
                        this.xblock.update({ children: content });

                    } else {
                        var contentElement = findNodeContentElement(this);
                        contentElement.innerHTML = content;
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
                // don`t clone content nodes
                var node = Node.prototype.cloneNode.call(this, false);

                if (deep) {
                    node.content = this.content;
                }

                return node;
            }
        }
    });

    function findNodeContentElement(node) {
        if (!node.firstChild) {
            return node;
        }

        var element = node.querySelector('[data-xb-content="' + node.xuid + '"]');

        if (!element) {
            element = node.querySelector('script[type="text/template"]');

            if (xblocks.utils.support.template && (!element || element.parentNode !== node)) {
                element = node.querySelector('template');

                if (element && element.parentNode === node) {
                    // FIXME temporarily, until the implementation of the DocumentFragment
                    var tmp = global.document.createElement('div');
                    tmp.appendChild(global.document.importNode(element.content, true));
                    element = tmp;
                }
            }
        }

        return element || node;
    }

    return xtag.register(blockName, xblocks.utils.merge.apply(xblocks.utils, options));
};
