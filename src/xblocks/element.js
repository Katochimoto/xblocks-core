'use strict';

var context = require('../context');
var dom = require('./dom');
var event = require('./event');
var ReactDOM = require('react-dom');
var utils = require('./utils');
var view = require('./view');

module.exports = Element;

/**
 * Xblock element constructor
 * @param {HTMLElement} node the node of a custom element
 * @constructor
 */
function Element(node) {
    node.xblock = this;

    this._callbackMutation = this._callbackMutation.bind(this);

    this._observerOptions = {
        'attributeFilter': Object.keys(node.xprops),
        'attributeOldValue': false,
        'attributes': true,
        'characterData': true,
        'characterDataOldValue': false,
        'childList': true,
        'subtree': false
    };

    this._node = node;
    this._init();
}

/**
 * The node of a custom element
 * @type {HTMLElement}
 * @protected
 */
Element.prototype._node = null;

/**
 * React component
 * @type {Constructor}
 * @protected
 */
Element.prototype._component = null;

/**
 * Instance MutationObserver
 * @type {MutationObserver}
 * @protected
 */
Element.prototype._observer = null;

/**
 * Unmounts a component and removes it from the DOM
 * @fires xblocks.Element~event:xb-destroy
 */
Element.prototype.destroy = function() {
    var node = this._node;
    var content = node.content;

    this._observer.disconnect();
    this._observer = null;
    this._component = null;
    this._node = null;

    ReactDOM.unmountComponentAtNode(node);

    // replace initial content after destroy react component
    // fix:
    // element.parentNode.removeChild(element);
    // document.body.appendChild(element);
    node.content = content;
    node.xblock = undefined;

    event.dispatch(node, 'xb-destroy', { 'bubbles': false, 'cancelable': false });

    DEBUG && utils.log.info('element destroy: %O', this);
};

/**
 * Update react view
 * @param {object} [props] added attributes
 * @param {array} [removeProps] remote attributes
 * @param {function} [callback] the callback function
 */
Element.prototype.update = function(props, removeProps, callback) {
    var nextProps = utils.merge(true, {}, this.getMountedProps(), this._node.props, props);

    // merge of new and current properties
    // and the exclusion of remote properties
    if (Array.isArray(removeProps) && removeProps.length) {
        var l = removeProps.length;
        while (l--) {
            if (nextProps.hasOwnProperty(removeProps[ l ])) {
                delete nextProps[ removeProps[ l ] ];
            }
        }
    }

    dom.attrs.typeConversion(nextProps, this._node.xprops);

    var proxyConstructor = view.getFactory(this._node.xtagName)(nextProps);
    var that = this;
    var renderCallback = function() {
        that._component = this;
        that._callbackUpdate(callback);
    };

    this._observer.disconnect();
    this._component = ReactDOM.render(proxyConstructor, this._node, renderCallback);

    DEBUG && utils.log.info('element update: %O, props: %O', this, nextProps);
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
 * @protected
 */
Element.prototype._init = function() {
    var children = this._node.content;
    var props = utils.merge(true, {}, this._node.props, {
        '_uid': this._node.xuid,
        '_container': this._node
    });

    dom.attrs.typeConversion(props, this._node.xprops);

    var proxyConstructor = view.getFactory(this._node.xtagName)(props, children);
    var that = this;
    var renderCallback = function() {
        that._component = this;
        that._callbackInit();
    };

    this._component = ReactDOM.render(proxyConstructor, this._node, renderCallback);

    DEBUG && utils.log.info('element init: %O', this);
};

/**
 * @protected
 * @fires xblocks.Element~event:xb-created
 */
Element.prototype._callbackInit = function() {
    this._node.upgrade();
    this._observer = new context.MutationObserver(this._callbackMutation);
    this._observer.observe(this._node, this._observerOptions);

    event.dispatch(this._node, 'xb-created');
    utils.lazy(globalInitEvent, this._node);

    DEBUG_TIME && utils.log.time(this._node, 'xb_init');
};

/**
 * @param {function} [callback] the callback function
 * @protected
 * @fires xblocks.Element~event:xb-update
 */
Element.prototype._callbackUpdate = function(callback) {
    this._node.upgrade();
    this._observer.observe(this._node, this._observerOptions);

    event.dispatch(this._node, 'xb-update');
    utils.lazy(globalUpdateEvent, this._node);

    if (callback) {
        callback.call(this);
    }
};

/**
 * @param {MutationRecord[]} records
 * @protected
 */
Element.prototype._callbackMutation = function(records) {
    var removeAttrs = records
        .filter(filterAttributesRemove, this)
        .map(mapAttributesName);

    this.update(null, removeAttrs);
};

/**
 * @param {MutationRecord} record
 * @returns {boolean}
 * @protected
 */
function filterAttributesRemove(record) {
    return (record.type === 'attributes' && !this._node.hasAttribute(record.attributeName));
}

/**
 * @param {MutationRecord} record
 * @returns {string}
 * @protected
 */
function mapAttributesName(record) {
    return record.attributeName;
}

/**
 * @param {array} records
 * @protected
 */
function globalInitEvent(records) {
    event.dispatch(context, 'xb-created', { 'detail': { 'records': records } });
}

/**
 * @param {array} records
 * @protected
 */
function globalUpdateEvent(records) {
    event.dispatch(context, 'xb-update', { 'detail': { 'records': records } });
}

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
