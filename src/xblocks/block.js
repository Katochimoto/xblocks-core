(function(xtag, xblocks) {

    /**
     * @param {String} blockName
     * @param {Object} options
     * @returns {HTMLElement}
     */
    xblocks.create = function(blockName, options) {
        options = typeof(options) === 'object' ? options : {};

        xblocks.merge(true, options, {
            lifecycle: {
                /**
                 * @this {HTMLElement}
                 */
                created: function() {
                    /**
                     * @type {XBElement}
                     */
                    this.xblock = xblocks.element.create(this);
                },

                /**
                 * @this {HTMLElement}
                 */
                removed: function() {
                    this.xblock.destroy();
                    delete this.xblock;
                },

                /**
                 * @this {HTMLElement}
                 */
                attributeChanged: function(attrName, oldValue, newValue) {
                    if (this.xblock._isMountedComponent()) {
                        return;
                    }

                    // removeAttribute('xb-static')
                    if (attrName === 'xb-static' && newValue === null) {
                        this.xblock._repaint();
                    }
                }
            },

            accessors: {
                content: {
                    /**
                     * @this {HTMLElement}
                     */
                    get: function() {
                        return this.xblock._getNodeContent();
                    },

                    /**
                     * @this {HTMLElement}
                     */
                    set: function(content) {
                        this.xblock._setNodeContent(content);
                    }
                }
            }
        });

        return xtag.register(blockName, options);
    };

}(xtag, xblocks));
