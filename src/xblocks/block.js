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
                this.xblock = xblocks.element.create(this);
            },

            inserted: function() {

            },

            removed: function() {
                this.xblock.destroy();
                delete this.xblock;
            },

            attributeChanged: function(attrName, oldValue, newValue) {
                if (this.xblock._isMountedComponent()) {
                    return;
                }

                // removeAttribute('xb-static')
                if (attrName === xblocks.dom.attrs.XB_ATTRS.STATIC && newValue === null) {
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
                    return this.xblock._getNodeContent();
                },

                /**
                 * @param {string} content
                 */
                set: function(content) {
                    this.xblock._setNodeContent(content);
                }
            }
        }
    });

    return xtag.register(blockName, xblocks.utils.merge.apply(xblocks.utils, options));
};
