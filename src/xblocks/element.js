import ReactDOM from 'react-dom';
import merge from 'lodash/merge';
import keys from 'lodash/keys';
import isArray from 'lodash/isArray';
import context from '../context';
import { typeConversion } from './dom/attrs';
import { getFactory } from './view';
import { dispatch } from './event';
import lazy from './utils/lazy';

/**
 * Xblock element constructor
 * @param {HTMLElement} node the node of a custom element
 * @constructor
 */
export function XBElement(node) {
    node.xblock = this;

    this._callbackMutation = this._callbackMutation.bind(this);

    this._observerOptions = {
        'attributeFilter': keys(node.xprops),
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
XBElement.prototype._node = null;

/**
 * React component
 * @type {Constructor}
 * @protected
 */
XBElement.prototype._component = null;

/**
 * Instance MutationObserver
 * @type {MutationObserver}
 * @protected
 */
XBElement.prototype._observer = null;

/**
 * Unmounts a component and removes it from the DOM
 * @fires xblocks.Element~event:xb-destroy
 */
XBElement.prototype.destroy = function () {
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

    dispatch(node, 'xb-destroy', { 'bubbles': false, 'cancelable': false });
};

/**
 * Update react view
 * @param {object} [props] added attributes
 * @param {array} [removeProps] remote attributes
 * @param {function} [callback] the callback function
 */
XBElement.prototype.update = function (props, removeProps, callback) {
    var nextProps = merge({}, this.getMountedProps(), this._node.props, props);

    // merge of new and current properties
    // and the exclusion of remote properties
    if (isArray(removeProps) && removeProps.length) {
        var l = removeProps.length;
        while (l--) {
            if (nextProps.hasOwnProperty(removeProps[ l ])) {
                delete nextProps[ removeProps[ l ] ];
            }
        }
    }

    typeConversion(nextProps, this._node.xprops);

    var proxyConstructor = getFactory(this._node.xtagName)(nextProps);
    var that = this;
    var renderCallback = function () {
        that._component = this;
        that._callbackUpdate(callback);
    };

    this._observer.disconnect();
    this._component = ReactDOM.render(proxyConstructor, this._node, renderCallback);
};

/**
 * Returns true if the component is rendered into the DOM, false otherwise
 * @see http://facebook.github.io/react/docs/component-api.html#ismounted
 * @returns {boolean}
 */
XBElement.prototype.isMounted = function () {
    return Boolean(this._component && this._component.isMounted());
};

/**
 * Installing a new content react component
 * @param {string} content
 */
XBElement.prototype.setMountedContent = function (content) {
    if (this.isMounted()) {
        this.update({ 'children': content });
    }
};

/**
 * Receiving the content components react
 * @returns {?string}
 */
XBElement.prototype.getMountedContent = function () {
    if (this.isMounted()) {
        return this._component.props.children;
    }
};

/**
 * Get components react
 * @returns {?ReactCompositeComponent.createClass.Constructor}
 */
XBElement.prototype.getMountedComponent = function () {
    if (this.isMounted()) {
        return this._component;
    }
};

/**
 * Gets the attributes of the components
 * @returns {?object}
 */
XBElement.prototype.getMountedProps = function () {
    return this.isMounted() ? this._component.props : null;
};

/**
 * @protected
 */
XBElement.prototype._init = function () {
    var children = this._node.content;
    var props = merge({}, this._node.props, {
        _uid: this._node.xuid,
        _container: this._node
    });

    typeConversion(props, this._node.xprops);

    var proxyConstructor = getFactory(this._node.xtagName)(props, children);
    var that = this;
    var renderCallback = function () {
        that._component = this;
        that._callbackInit();
    };

    this._component = ReactDOM.render(proxyConstructor, this._node, renderCallback);
};

/**
 * @protected
 * @fires xblocks.Element~event:xb-created
 */
XBElement.prototype._callbackInit = function () {
    this._node.upgrade();
    this._observer = new context.MutationObserver(this._callbackMutation);
    this._observer.observe(this._node, this._observerOptions);

    dispatch(this._node, 'xb-created');
    lazy(globalInitEvent, this._node);
};

/**
 * @param {function} [callback] the callback function
 * @protected
 * @fires xblocks.Element~event:xb-update
 */
XBElement.prototype._callbackUpdate = function (callback) {
    this._node.upgrade();
    this._observer.observe(this._node, this._observerOptions);

    dispatch(this._node, 'xb-update');
    lazy(globalUpdateEvent, this._node);

    if (callback) {
        callback.call(this);
    }
};

/**
 * @param {MutationRecord[]} records
 * @protected
 */
XBElement.prototype._callbackMutation = function (records) {
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
    dispatch(context, 'xb-created', { 'detail': { 'records': records } });
}

/**
 * @param {array} records
 * @protected
 */
function globalUpdateEvent(records) {
    dispatch(context, 'xb-update', { 'detail': { 'records': records } });
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
