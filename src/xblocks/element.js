'use strict';

var context = require('../context');
var dom = require('./dom');
var event = require('./event');
var React = require('react');
var utils = require('./utils');
var view = require('./view');

module.exports = Element;

var elementStatic = {
    /**
     * @param {MutationRecord} record
     * @returns {boolean}
     * @protected
     */
    checkNodeChange: function(record) {
        return (record.type === 'childList');
    },

    /**
     * @param {MutationRecord} record
     * @returns {boolean}
     * @protected
     */
    checkAttributesChange: function(record) {
        return (record.type === 'attributes');
    },

    /**
     * @param {MutationRecord} record
     * @returns {boolean}
     * @protected
     */
    filterAttributesRemove: function(record) {
        return (record.type === 'attributes' && !this._node.hasAttribute(record.attributeName));
    },

    /**
     * @param {MutationRecord} record
     * @returns {string}
     * @protected
     */
    mapAttributesName: function(record) {
        return record.attributeName;
    },

    /**
     * @param {array} records
     * @protected
     */
    globalInitEvent: function(records) {
        event.dispatch(context, 'xb-created', { 'detail': { 'records': records } });
    },

    /**
     * @param {array} records
     * @protected
     */
    globalRepaintEvent: function(records) {
        event.dispatch(context, 'xb-repaint', { 'detail': { 'records': records } });
    }

    /**
     * @param {array} records
     * @protected
     */
    //globalUpdateEvent: function(records) {
    //    event.dispatch(context, 'xb-update', { 'detail': { 'records': records } });
    //}
};

/**
 * Xblock element constructor
 * @param {HTMLElement} node the node of a custom element
 * @constructor
 */
function Element(node) {
    node.xblock = this;
    this._node = node;
    this._init(node.state, node.content, this._callbackInit);
}

/**
 * The node of a custom element
 *
 * @type {HTMLElement}
 * @protected
 */
Element.prototype._node = null;

/**
 * React component
 *
 * @type {Constructor}
 * @protected
 */
Element.prototype._component = null;

/**
 * Instance MutationObserver
 *
 * @type {MutationObserver}
 * @protected
 */
Element.prototype._observer = null;

/**
 * Unmounts a component and removes it from the DOM
 * @fires xblocks.Element~event:xb-destroy
 */
Element.prototype.destroy = function() {
    React.unmountComponentAtNode(this._node);
    this.unmount();
    event.dispatch(this._node, 'xb-destroy', { 'bubbles': false, 'cancelable': false });
};

/**
 * Unmounts a component
 */
Element.prototype.unmount = function() {
    if (this._observer) {
        this._observer.disconnect();
    }

    if (this.isMounted()) {
        this._component.unmountComponent();
    }

    this._component = null;
};

/**
 * Update react view
 * @param {object} [props] added attributes
 * @param {array} [removeProps] remote attributes
 * @param {function} [callback] the callback function
 */
Element.prototype.update = function(props, removeProps, callback) {
    if (!this.isMounted()) {
        return;
    }

    var nextProps = this._node.state;
    var action = 'setProps';

    if (typeof(props) === 'object') {
        var prop;
        for (prop in props) {
            if (props.hasOwnProperty(prop)) {
                nextProps[ prop ] = props[ prop ];
            }
        }
    }

    // merge of new and current properties
    // and the exclusion of remote properties
    if (Array.isArray(removeProps) && removeProps.length) {
        action = 'replaceProps';
        nextProps = utils.merge(true, {}, this.getMountedProps(), nextProps);

        var l = removeProps.length;
        while (l--) {
            if (nextProps.hasOwnProperty(removeProps[ l ])) {
                delete nextProps[ removeProps[ l ] ];
            }
        }
    }

    if (nextProps.hasOwnProperty('xb-static')) {
        this.repaint(callback);

    } else {
        dom.attrs.typeConversion(nextProps, this._node.xprops);
        this._component[ action ](nextProps, this._callbackUpdate.bind(this, callback));
    }
};

/**
 * Redrawing react view
 * @param {function} [callback] the callback function
 */
Element.prototype.repaint = function(callback) {
    var children = this._node.content;
    var props = this._node.state;
    var mprops = this.getMountedProps() || {};
    var prop;

    for (prop in mprops) {
        if (mprops.hasOwnProperty(prop)) {
            props[ prop ] = mprops[ prop ];
        }
    }

    this.destroy();
    this._init(props, children, this._callbackRepaint.bind(this, callback));
};

/**
 * Returns true if the component is rendered into the DOM, false otherwise
 * @see http://facebook.github.io/react/docs/component-api.html#ismounted
 * @returns {boolean}
 */
Element.prototype.isMounted = function() {
    return Boolean(this._component && this._component.isMounted());
};

/**
 * Installing a new content react component
 * @param {string} content
 */
Element.prototype.setMountedContent = function(content) {
    if (this.isMounted()) {
        this.update({ 'children': content });
    }
};

/**
 * Receiving the content components react
 * @returns {?string}
 */
Element.prototype.getMountedContent = function() {
    if (this.isMounted()) {
        return this._component.props.children;
    }
};

/**
 * Get components react
 * @returns {?ReactCompositeComponent.createClass.Constructor}
 */
Element.prototype.getMountedComponent = function() {
    if (this.isMounted()) {
        return this._component;
    }
};

/**
 * Gets the attributes of the components
 * @returns {?object}
 */
Element.prototype.getMountedProps = function() {
    return this.isMounted() ? this._component.props : null;
};

/**
 * @param {object} [props]
 * @param {string} [children]
 * @param {function} [callback] the callback function
 * @protected
 */
Element.prototype._init = function(props, children, callback) {
    if (this.isMounted()) {
        return;
    }

    props._uid = this._node.xuid;
    props._container = this._node;
    dom.attrs.typeConversion(props, this._node.xprops);

    var proxyConstructor = view.getFactory(this._node.xtagName)(props, children);

    if (props.hasOwnProperty('xb-static')) {
        this.unmount();
        utils.log.time(this._node, 'react_render');
        this._node.innerHTML = React.renderToStaticMarkup(proxyConstructor);
        utils.log.time(this._node, 'react_render');
        this._node.upgrade();

        if (callback) {
            callback.call(this);
        }

    } else {
        utils.log.time(this._node, 'react_render');
        var that = this;
        this._component = React.render(
            proxyConstructor,
            this._node,
            function() {
                utils.log.time(that._node, 'react_render');
                that._component = this;
                that._callbackRender(callback);
            }
        );
    }
};

/**
 * @protected
 * @fires xblocks.Element~event:xb-created
 */
Element.prototype._callbackInit = function() {
    event.dispatch(this._node, 'xb-created');
    utils.lazy(elementStatic.globalInitEvent, this._node);
    utils.log.time(this._node, 'xb_init');
};

/**
 * @param {function} [callback] the callback function
 * @protected
 * @fires xblocks.Element~event:xb-repaint
 */
Element.prototype._callbackRepaint = function(callback) {
    event.dispatch(this._node, 'xb-repaint');
    utils.lazy(elementStatic.globalRepaintEvent, this._node);

    if (callback) {
        callback.call(this);
    }
};

/**
 * @param {function} [callback] the callback function
 * @protected
 */
Element.prototype._callbackRender = function(callback) {
    this._node.upgrade();

    if (!this._observer) {
        this._observer = new context.MutationObserver(this._callbackMutation.bind(this));
    }

    this._observer.observe(this._node, {
        'attributes': true,
        'childList': true,
        'characterData': true,
        'subtree': false,
        'attributeOldValue': false,
        'characterDataOldValue': false,
        'attributeFilter': Object.keys(this._node.xprops)
    });

    if (callback) {
        callback.call(this);
    }
};

/**
 * @param {MutationRecord[]} records
 * @protected
 */
Element.prototype._callbackMutation = function(records) {
    if (!this.isMounted()) {
        return;
    }

    // full repaint
    if (records.some(elementStatic.checkNodeChange)) {
        this.repaint();

    } else if (records.some(elementStatic.checkAttributesChange)) {

        var removeAttrs = records
            .filter(elementStatic.filterAttributesRemove, this)
            .map(elementStatic.mapAttributesName);

        this.update(null, removeAttrs);
    }
};

/**
 * @param {function} [callback] the callback function
 * @protected
 * @fires xblocks.Element~event:xb-update
 */
Element.prototype._callbackUpdate = function(callback) {
    this._node.upgrade();

    event.dispatch(this._node, 'xb-update');
    //utils.lazy(elementStatic.globalUpdateEvent, this._node);

    if (callback) {
        callback.call(this);
    }
};


/**
 * Created event
 * @event xblocks.Element~event:xb-created
 * @type {xblocks.event.Custom}
 */

/**
 * Destroy event
 * @event xblocks.Element~event:xb-destroy
 * @type {xblocks.event.Custom}
 */

/**
 * Updated event
 * @event xblocks.Element~event:xb-update
 * @type {xblocks.event.Custom}
 */

/**
 * Repaint event
 * @event xblocks.Element~event:xb-repaint
 * @type {xblocks.event.Custom}
 */
