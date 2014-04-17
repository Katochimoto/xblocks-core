(function(xtag, xblocks) {

    xblocks.create = function(blockName, options) {
        options = typeof(options) === 'object' ? options : {};

        options.lifecycle = {
            created: function() {
                this.xblock = xblocks.element.create(this);
            },

            removed: function() {
                this.xblock.destroy();
                delete this.xblock;
            }
        };

        return xtag.register(blockName, options);
    };

}(xtag, xblocks));
