(function(xtag, xblocks) {

    /**
     * @param {String} blockName
     * @param {Object} options
     * @returns {HTMLElement}
     */
    xblocks.create = function(blockName, options) {
        options = typeof(options) === 'object' ? options : {};

        options.lifecycle = {
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
            }
        };

        return xtag.register(blockName, options);
    };

}(xtag, xblocks));
