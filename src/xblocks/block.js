(function(xtag, xblocks) {

    xblocks.create = function(blockName, options) {
        options = typeof(options) === 'object' ? options : {};

        options.lifecycle = {
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
                var props = {};
                props[attrName] = xblocks.dom.attrs.getRealValue(attrName, newValue);
                this.xblock.update(props);
            }
        };

        return xtag.register(blockName, options);
    };

}(xtag, xblocks));
