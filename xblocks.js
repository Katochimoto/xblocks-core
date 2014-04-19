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

    /* xblocks/utils.js begin */
(function(xblocks) {

    /**
     * @param {object} to
     * @param {object} from
     * @returns {object}
     */
    xblocks.merge = function(to, from) {
        Object.keys(from).forEach(function(property) {
            Object.defineProperty(to, property, Object.getOwnPropertyDescriptor(from, property));
        });

        return to;
    };

    /**
     * @param {*} param
     * @returns {string}
     */
    xblocks.type = function(param) {
        return ({}).toString.call(param).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    };

}(xblocks));

/* xblocks/utils.js end */

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

    var XBView = {};

    /**
     * @module xblocks.view
     */
    xblocks.view = {};

    /**
     * @param {string} blockName
     * @param {object} component
     */
    xblocks.view.register = function(blockName, component) {
        component.mixins = Array.isArray(component.mixins) ? component.mixins: [];
        component.mixins.push(XBView);

        return (React.DOM[blockName] = React.createClass(component));
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

            removed: function() {
                this.xblock.destroy();
                delete this.xblock;
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
        this._name = node.tagName.toLowerCase();
        this._node = node;
        this._component = null;
        this._observer = new MutationObserver(this._callbackMutation.bind(this));

        this._init(null, this._callbackInit);
    }

    /**
     * @type {string}
     * @private
     */
    XBElement.prototype._name = undefined;

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
        try {
            this._observer.disconnect();

            if (this._isMountedComponent()) {
                React.unmountComponentAtNode(this._node);
                this._component.unmountComponent();
                this._component = null;
            }
        } catch(e) {
        }
    };

    /**
     * @param {object} [props]
     */
    XBElement.prototype.update = function(props) {
        if (!this._isMountedComponent()) {
            return;
        }

        this._component.setProps(this._getNodeProps(props));
    };

    /**
     * @param {object} [props]
     * @param {function} [callback]
     * @private
     */
    XBElement.prototype._init = function(props, callback) {
        if (this._isMountedComponent()) {
            return;
        }

        var view = xblocks.view.get(this._name);

        // save last children and props after repaint
        var nextProps = this._getNodeProps(props);
        var children = this._node.innerHTML || nextProps.children;

        this._component = React.renderComponent(
            view(nextProps, children),
            this._node,
            this._callbackRender.bind(this, callback)
        );
    };

    /**
     * @private
     */
    XBElement.prototype._repaint = function() {
        var lastProps = this._isMountedComponent() ? this._component.props : null;
        this.destroy();
        this._init(lastProps, this._callbackRepaint);
    };

    /**
     * @private
     */
    XBElement.prototype._callbackInit = function() {
        xtag.fireEvent(this._node, 'xb-created');
    };

    /**
     * @private
     */
    XBElement.prototype._callbackRepaint = function() {
        xtag.fireEvent(this._node, 'xb-repaint');
    };

    /**
     * @param {function} [callback]
     * @private
     */
    XBElement.prototype._callbackRender = function(callback) {
        this._observer.observe(this._node, {
            attributes: true,
            childList: true,
            characterData: true,
            subtree: false,
            attributeOldValue: false,
            characterDataOldValue: false
        });

        if (callback) {
            callback.call(this);
        }
    };

    /**
     * @param {MutationRecord[]} records
     * @private
     */
    XBElement.prototype._callbackMutation = function(records) {
        if (!this._isMountedComponent()) {
            return;
        }

        // full repaint
        if (records.some(this._checkChangeNode, this)) {
            this._repaint();

        } else if (records.some(this._checkChangeAttributes, this)) {
            this.update();
        }
    };

    /**
     * @param {object} [props]
     * @returns {object}
     */
    XBElement.prototype._getNodeProps = function(props) {
        var nodeProps = xblocks.dom.attrs.toObject(this._node);

        if (xblocks.type(props) === 'object') {
            xblocks.merge(nodeProps, props);
        }

        return nodeProps;
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
    XBElement.prototype._checkChangeNode = function(record) {
        return (record.type === 'childList');
    };

    /**
     * @param {MutationRecord} record
     * @returns {boolean}
     * @private
     */
    XBElement.prototype._checkChangeAttributes = function(record) {
        return (record.type === 'attributes');
    };

}(xtag, xblocks, React));

/* xblocks/element.js end */


}());
