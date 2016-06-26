/**
 * @module xblocks-core/element
 */

import ReactDOM from 'react-dom';
import merge from 'lodash/merge';
import clone from 'lodash/clone';
import keys from 'lodash/keys';
import forEach from 'lodash/forEach';
import omit from 'lodash/omit';
import get from 'lodash/get';
import context from '../context';
import { typeConversion } from './dom/attrs';
import { dispatch } from './event';
import lazy from './utils/lazy';
import importStyle from './utils/importStyle';
import createShadowMountPoint from './utils/createShadowMountPoint';
import appComponent from './utils/Component';
import Constants from './constants';
import { contentNode } from './dom';

/**
 * Xblock element constructor.
 * @alias module:xblocks-core/element~XBElement
 * @param {HTMLElement} node the node of a custom element
 * @constructor
 */
export function XBElement(node) {
    node[ Constants.BLOCK ] = this;

    this.isShadow = false;
    this._node = node;
    this._mountPoint = node;

    if (node.isShadowSupported) {
        const mountPoint = createShadowMountPoint(node);

        if (mountPoint) {
            this._mountPoint = mountPoint;
            this.isShadow = true;
        }
    }

    this._observerOptions = {
        attributeFilter: keys(node.xprops),
        attributeOldValue: false,
        attributes: true,
        characterData: !this.isShadow,
        characterDataOldValue: false,
        childList: !this.isShadow
        // subtree: !this.isShadow
    };

    this._init();
}

/**
 * The component is mounted in the shadow root.
 * @type {boolean}
 */
XBElement.prototype.isShadow = false;

/**
 * The node of a react component.
 * @type {HTMLElement}
 * @protected
 */
XBElement.prototype._mountPoint = null;

/**
 * The node of a custom element.
 * @type {HTMLElement}
 * @protected
 */
XBElement.prototype._node = null;

/**
 * React component.
 * @type {Constructor}
 * @protected
 */
XBElement.prototype._component = null;

/**
 * Instance MutationObserver.
 * @type {MutationObserver}
 * @protected
 */
XBElement.prototype._observer = null;

/**
 * Unmounts a component and removes it from the DOM.
 * @fires module:xblocks-core/element~XBElement~event:xb-destroy
 */
XBElement.prototype.destroy = function () {
    const node = this._node;
    const mountPoint = this._mountPoint;
    const content = node.content;

    this._observer.disconnect();
    this._observer = null;
    this._component = null;
    this._node = null;
    this._mountPoint = null;

    ReactDOM.unmountComponentAtNode(mountPoint);

    // replace initial content after destroy react component
    // fix:
    // element.parentNode.removeChild(element);
    // document.body.appendChild(element);
    node.content = content;
    node[ Constants.BLOCK ] = undefined;

    dispatch(node, 'xb-destroy');
};

/**
 * Update react view.
 * @example
 * var element = document.createElement('xb-test');
 * element.xblock.update();
 * @param {Object} [props] added attributes
 * @param {array} [removeProps] remote attributes
 * @param {function} [callback] the callback function
 */
XBElement.prototype.update = function (props, removeProps, callback) {
    this._observer.disconnect();

    const node = this._node;
    // merge of new and current properties and the exclusion of remote properties
    const nextProps = omit(merge({}, this.getMountedProps(), node.props, props), removeProps);

    typeConversion(nextProps, node.xprops);

    const that = this;
    const renderCallback = function () {
        that._component = this;
        that._callbackUpdate(callback);
    };

    importStyle(node, node.componentStyle);
    this._component = ReactDOM.render(appComponent(nextProps), this._mountPoint, renderCallback);
};

/**
 * Returns true if the component is rendered into the DOM, false otherwise.
 * @see http://facebook.github.io/react/docs/component-api.html#ismounted
 * @returns {boolean}
 */
XBElement.prototype.isMounted = function () {
    return Boolean(this._component && this._component.isMounted());
};

/**
 * Installing a new content react component.
 * @param {string} content
 */
XBElement.prototype.setMountedContent = function (content) {
    if (this.isMounted()) {
        if (this.isShadow) {
            this._node.innerHTML = content;

        } else {
            this.update({ children: content });
        }
    }
};

/**
 * Receiving the content components react.
 * @returns {?string}
 */
XBElement.prototype.getMountedContent = function () {
    if (this.isMounted()) {
        if (this.isShadow) {
            return this._node.innerHTML;

        } else {
            return this._component.props.children;
        }
    }
};

/**
 * Get components react.
 * @returns {?ReactCompositeComponent.createClass.Constructor}
 */
XBElement.prototype.getUserComponent = function () {
    return get(this, '_component.userComponent', null);
};

/**
 * Gets the attributes of the components.
 * @returns {?Object}
 */
XBElement.prototype.getMountedProps = function () {
    return this.isMounted() ? this._component.props : null;
};

/**
 * @protected
 */
XBElement.prototype._init = function () {
    const node = this._node;
    const props = clone(node.props);

    typeConversion(props, node.xprops);

    props._container = node;
    props.children = node.content;

    const that = this;
    const renderCallback = function () {
        that._component = this;
        that._callbackInit();
    };

    importStyle(node, node.componentStyle);
    this._component = ReactDOM.render(appComponent(props), this._mountPoint, renderCallback);
};

/**
 * @protected
 * @fires module:xblocks-core/element~XBElement~event:xb-created
 */
XBElement.prototype._callbackInit = function () {
    const node = this._node;
    node.upgrade();
    this._observer = new context.MutationObserver(::this._callbackMutation);
    this._observer.observe(node, this._observerOptions);

    dispatch(node, 'xb-created');
    lazy(globalInitEvent, node);
};

/**
 * @param {function} [callback] the callback function
 * @protected
 * @fires module:xblocks-core/element~XBElement~event:xb-update
 */
XBElement.prototype._callbackUpdate = function (callback) {
    const node = this._node;
    node.upgrade();
    this._observer.observe(node, this._observerOptions);

    dispatch(node, 'xb-update');
    lazy(globalUpdateEvent, node);

    if (callback) {
        callback.call(this);
    }
};

/**
 * @param {MutationRecord[]} records
 * @protected
 */
XBElement.prototype._callbackMutation = function (records) {
    const removeAttrs = records
        .filter(filterAttributesRemove, this)
        .map(mapAttributesName);

    const isChildListMutation = records.some(childListMutationIterate);
    const props = {};

    if (isChildListMutation) {
        const node = this._node;
        const doc = node.ownerDocument;
        const mutationContent = doc.createElement('div');
        const targetContent = mutationContent.appendChild(doc.createElement('div'));

        records
            .filter(childListMutationIterate)
            .reduce(reduceChildListMutation, mutationContent);

        if (targetContent.parentNode) {
            targetContent.outerHTML = contentNode(node).innerHTML;
        }

        props.children = mutationContent.innerHTML;
    }

    this.update(props, removeAttrs);
};

/**
 * Verification of the attribute that was removed.
 * @example
 * // false
 * filterAttributesRemove({ type: 'attributes', attributeName: 'test' })
 * @param {MutationRecord} record
 * @returns {boolean}
 * @this XBElement
 * @private
 */
function filterAttributesRemove(record) {
    return (record.type === 'attributes' && !this._node.hasAttribute(record.attributeName));
}

/**
 * The allocation of attribute names
 * @example
 * // "test"
 * mapAttributesName({ attributeName: 'test' });
 * @param {MutationRecord} record
 * @returns {string}
 * @private
 */
function mapAttributesName(record) {
    return record.attributeName;
}

/**
 * Verification of the mutation sub-elements.
 * @example
 * // true
 * childListMutationIterate({ type: 'childList', attributeName: 'test' })
 * @param {MutationRecord} record
 * @returns {boolean}
 * @private
 */
function childListMutationIterate(record) {
    return (record.type === 'childList' || record.type === 'characterData');
}

/**
 * The allocation of the changed nodes.
 * @param {HTMLElement} mutationContent
 * @param {MutationRecord} record
 * @returns {HTMLElement}
 * @private
 */
function reduceChildListMutation(mutationContent, record) {
    const isAdded = Boolean(record.addedNodes.length);
    const isNext = Boolean(record.nextSibling);
    const isPrev = Boolean(record.previousSibling);
    const isRemoved = Boolean(record.removedNodes.length);

    // innerHTML or replace
    if (isAdded && (isRemoved || (!isRemoved && !isNext && !isPrev))) {
        while (mutationContent.firstChild) {
            mutationContent.removeChild(mutationContent.firstChild);
        }

        forEach(record.addedNodes, function (node) {
            mutationContent.appendChild(node);
        });

    // appendChild
    } else if (isAdded && !isRemoved && !isNext && isPrev) {
        forEach(record.addedNodes, function (node) {
            mutationContent.appendChild(node);
        });

    // insertBefore
    } else if (isAdded && !isRemoved && isNext && !isPrev) {
        forEach(record.addedNodes, function (node) {
            mutationContent.insertBefore(node, mutationContent.firstChild);
        });
    }

    return mutationContent;
}

/**
 * Call global events "xb-created"
 * @example
 * globalInitEvent([]);
 * @param {array} records
 * @private
 */
function globalInitEvent(records) {
    dispatch(context, 'xb-created', { detail: { records } });
}

/**
 * Call global events "xb-update"
 *
 * @example
 * globalUpdateEvent([]);
 *
 * @param {array} records
 * @private
 */
function globalUpdateEvent(records) {
    dispatch(context, 'xb-update', { detail: { records } });
}

/**
 * Created event
 * @event module:xblocks-core/element~XBElement~event:xb-created
 * @type {CustomEvent}
 */

/**
 * Destroy event
 * @event module:xblocks-core/element~XBElement~event:xb-destroy
 * @type {CustomEvent}
 */

/**
 * Updated event
 * @event module:xblocks-core/element~XBElement~event:xb-update
 * @type {CustomEvent}
 */
