/* global xblocks */
/* jshint strict: false */

var _blockCommon = {
    lifecycle: {
        created: function() {
            this.xtagName = this.tagName.toLowerCase();
            this.xtmpl = {};
            this.xuid = xblocks.utils.seq();
            this.xprops = xblocks.utils.propTypes(this.xtagName);
            this._inserted = false;
        },

        inserted: function() {
            if (this._inserted) {
                return;
            }

            this._inserted = true;

            // asynchronous read content
            // <xb-test><script>...</script><div>not found</div></xb-test>
            if (this.getElementsByTagName('script').length) {
                xblocks.utils.lazy(_blockLazyInstantiation, this);

            } else {
                _blockInstantiation(this);
            }
        },

        removed: function() {
            this._inserted = false;

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
            if (attrName === xblocks.dom.attrs.XB_ATTRS.STATIC &&
                newValue === null &&
                this.xblock &&
                !this.mounted) {

                this.xblock._repaint();
            }
        }
    },

    accessors: {
        // check mounted react
        mounted: {
            get: function() {
                return Boolean(this.xblock && this.xblock._isMountedComponent());
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
                    this.xblock.update({ 'children': content });

                } else {
                    xblocks.utils.contentNode(this).innerHTML = content;
                    this.upgrade();
                }
            }
        },

        // getting object attributes
        attrs: {
            get: function() {
                return xblocks.dom.attrs.toObject(this);
            }
        },

        state: {
            get: function() {
                var props = {};
                var elementProps = xblocks.tag.tags[this.xtagName].accessors;

                for (var prop in elementProps) {
                    if (this.xprops.hasOwnProperty(prop) &&
                        elementProps.hasOwnProperty(prop) &&
                        !_blockCommon.accessors.hasOwnProperty(prop)) {

                        props[prop] = this[prop];
                    }
                }

                props = xblocks.utils.merge({}, xblocks.dom.attrs.toObject(this), props);
                xblocks.dom.attrs.typeConversion(props, this.xprops);
                return props;
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
            node.xtmpl = this.xtmpl;
            node._inserted = false;

            if (deep) {
                node.content = this.content;
            }

            return node;
        }
    }
};

function _blockTmplCompile(tmplElement) {
    this.xtmpl[ tmplElement.getAttribute('ref') ] = tmplElement.innerHTML;
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

/**
 * @param {string} blockName
 * @param {?object} options
 * @returns {HTMLElement}
 */
xblocks.create = function(blockName, options) {
    options = Array.isArray(options) ? options : [ options ];
    options.unshift(true, {});
    options.push(_blockCommon);
    return xblocks.tag.register(blockName, xblocks.utils.merge.apply({}, options));
};
