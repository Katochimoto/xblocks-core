/* global xblocks, global */
(function(global, xblocks) {
    'use strict';

    /**
     * @param {String} blockName
     * @param {?Object} options
     * @returns {HTMLElement}
     */
    xblocks.create = function(blockName, options) {
        options = xblocks.utils.isPlainObject(options) ? options : {};

        xblocks.utils.extend(true, options, {
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

        return global.xtag.register(blockName, options);
    };

}(global, xblocks));
