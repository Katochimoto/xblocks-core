/*jshint -W067 */
(function() {
    'use strict';

    /**
     * @module xblocks
     */
    var xblocks = {};

    var namespace;

    if (typeof module !== 'undefined') {
        namespace = module.exports = xblocks;

    } else {
        namespace = (function() {
            return this || (1, eval)('this');
        }());
    }

    namespace.xblocks = xblocks;

    /* xblocks/dom.js begin */
(function(xblocks) {

    /**
     * @module xblocks.dom
     */
    xblocks.dom = {};

    /* xblocks/dom/attrs.js begin */
/**
 * @module xblocks.dom.attrs
 */
xblocks.dom.attrs = {};

xblocks.dom.attrs.ARRTS_BOOLEAN = [
    'checked', 'selected', 'disabled', 'readonly', 'multiple', 'ismap', 'defer'
];

/**
 * @param {string} name
 * @param {string} value
 * @returns {string|boolean}
 */
xblocks.dom.attrs.getRealValue = function(name, value) {
    if (value === 'true' ||
        value === 'false' ||
        (xblocks.dom.attrs.ARRTS_BOOLEAN.indexOf(name) !== -1 && name === value)
    ) {
        return (name === value || value === 'true');
    }

    return value;
};

/**
 * Выделение атрибутов элемента в плоском представлении
 * @param {HTMLElement} element
 * @return {object}
 */
xblocks.dom.attrs.toObject = function(element) {
    if (element.nodeType !== 1) {
        return {};
    }

    var attrs = {};

    Array.prototype.forEach.call(element.attributes, function(attr) {
        attrs[attr.nodeName] = xblocks.dom.attrs.getRealValue(attr.nodeName, attr.value);
    });

    return attrs;
};

/* xblocks/dom/attrs.js end */


}(xblocks));

/* xblocks/dom.js end */

    /* xblocks/view.js begin */
(function(xblocks, React) {

    /**
     * @module xblocks.view
     */
    xblocks.view = {};

    xblocks.view.register = function(blockName, component) {
        React.DOM[blockName] = component;
    };

    xblocks.view.get = function(blockName) {
        return React.DOM[blockName];
    };

}(xblocks, React));

/* xblocks/view.js end */

    /* xblocks/block.js begin */
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

/* xblocks/block.js end */

    /* xblocks/element.js begin */
(function(xtag, xblocks, React) {

    /**
     * @module xblocks.element
     */
    xblocks.element = {};

    /**
     * @param {HTMLElement} node
     * @return {XBElement}
     */
    xblocks.element.create = function(node) {
        return new XBElement(node);
    };

    /**
     * @param {HTMLElement} node
     * @constructor
     */
    function XBElement(node) {
        this._node = node;
        this._component = null;

        var name = node.tagName.toLowerCase();

        var init = function() {
            this._component = React.renderComponent(
                xblocks.view.get(name)(this._getNodeProps()),
                this._node,
                this._observerBind.bind(this)
            );
        }.bind(this);

        var timeoutId;

        this._observer = new MutationObserver(function(records) {
            if (records.some(this._checkParentMutation, this) && this._isMountedComponent()) {
                this.destroy();
                clearTimeout(timeoutId);
                timeoutId = setTimeout(init, 1);
            }
        }.bind(this));

        init();
    }

    /**
     * @type {HTMLElement}
     * @private
     */
    XBElement.prototype._node = null;

    /**
     * @type {Constructor}
     * @private
     */
    XBElement.prototype._component = null;

    /**
     * @type {MutationObserver}
     * @private
     */
    XBElement.prototype._observer = null;

    XBElement.prototype.destroy = function() {
        this._observer.disconnect();

        if (this._isMountedComponent()) {
            try {
                React.unmountComponentAtNode(this._node);
                this._component.unmountComponent();
                this._component = null;
            } catch(e) {
            }
        }
    };

    /**
     * @param {object} props
     */
    XBElement.prototype.update = function(props) {
        if (!this._isMountedComponent()) {
            return;
        }

        props = typeof(props) === 'object' ? props : {};

        var installProps = this._getNodeProps();

        Object.keys(props).forEach(function(property) {
            Object.defineProperty(installProps, property, Object.getOwnPropertyDescriptor(props, property));
        });

        this._component.setProps(installProps);
    };

    /**
     * @returns {object}
     */
    XBElement.prototype._getNodeProps = function() {
        return xblocks.dom.attrs.toObject(this._node);
    };

    /**
     *
     * @returns {boolean}
     * @private
     */
    XBElement.prototype._isMountedComponent = function() {
        return (this._component && this._component.isMounted());
    };

    /**
     * @param {MutationRecord} record
     * @returns {boolean}
     * @private
     */
    XBElement.prototype._checkParentMutation = function(record) {
        return (record.type === 'childList' && record.target === this._node);
    };

    /**
     * @private
     */
    XBElement.prototype._observerBind = function() {
        this._observer.disconnect();
        this._observer.observe(this._node, {
            childList: true,
            characterData: true,
            subtree: true
        });
    };

}(xtag, xblocks, React));

/* xblocks/element.js end */


}());
