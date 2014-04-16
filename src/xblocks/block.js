(function(xtag, xblocks) {

    xblocks.create = function(blockName) {
        return new XBlock(blockName);
    };

    function XBlock(blockName) {
        this._name = blockName;
    }

    XBlock.prototype.register = function() {
        var accessors = {};
        var methods = {};

        Object.keys(this).filter(function(property) {
            return property.indexOf('_') !== 0;

        }).forEach(function(property) {
            var descr = Object.getOwnPropertyDescriptor(this, property);
            var typeProp = typeof(descr.value);

            if (typeProp === 'object') {
                if (typeof(descr.value.get) === 'function' || typeof(descr.value.set) === 'function') {
                    Object.defineProperty(accessors, property, descr);
                }

            } else if (typeProp === 'function') {
                Object.defineProperty(methods, property, descr);
            }

        }, this);

        xtag.register(this._name, {
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
                    var props = {};
                    props[attrName] = xblocks.dom.attrs.getRealValue(attrName, newValue);
                    this.xblock.update(props);
                }
            },

            accessors: accessors,

            methods: methods,

            events: {
                /*
                click: function(event) {
                    if (this.hasAttribute('disabled')) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                }
                */
            }
        });
    };

}(xtag, xblocks));
