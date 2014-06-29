/* global xblocks, global, React */
/* jshint strict: false */

/**
 * @param {HTMLElement} node
 * @constructor
 */
xblocks.element = function(node) {
    this._uid = xblocks.utils.uid();
    this._name = node.tagName.toLowerCase();
    this._node = node;

    this._init(this._getNodeProps(), this._getNodeContent(), this._callbackInit);
};

/**
 * @param {HTMLElement} node
 * @returns {xblocks.element}
 */
xblocks.element.create = function(node) {
    return new xblocks.element(node);
};

/**
 * @type {string}
 * @private
 */
xblocks.element.prototype._uid = undefined;

/**
 * @type {string}
 * @private
 */
xblocks.element.prototype._name = undefined;

/**
 * @type {HTMLElement}
 * @private
 */
xblocks.element.prototype._node = null;

/**
 * @type {Constructor}
 * @private
 */
xblocks.element.prototype._component = null;

/**
 * @type {MutationObserver}
 * @private
 */
xblocks.element.prototype._observer = null;

/**
 * Unmounts a component and removes it from the DOM
 */
xblocks.element.prototype.destroy = function() {
    React.unmountComponentAtNode(this._node);
    this.unmount();
};

/**
 * Unmounts a component
 */
xblocks.element.prototype.unmount = function() {
    if (this._observer) {
        this._observer.disconnect();
    }

    if (this._isMountedComponent()) {
        this._component.unmountComponent();
        this._component = null;
    }
};

/**
 * @param {object} [props]
 * @param {array} [removeProps]
 * @param {function} [callback]
 */
xblocks.element.prototype.update = function(props, removeProps, callback) {
    if (!this._isMountedComponent()) {
        return;
    }

    var nextProps = this._getNodeProps();
    var action = 'setProps';

    xblocks.utils.merge(true, nextProps, props);

    // merge of new and current properties
    // and the exclusion of remote properties
    if (Array.isArray(removeProps) && removeProps.length) {
        action = 'replaceProps';
        var currentProps = this._getCurrentProps();
        nextProps = xblocks.utils.merge(true, currentProps, nextProps);
        nextProps = xblocks.utils.filterObject(nextProps, function(name) {
            return removeProps.indexOf(name) === -1;
        });
    }

    if (nextProps.hasOwnProperty(xblocks.dom.attrs.XB_ATTRS.STATIC)) {
        this._repaint();

    } else {
        // TODO bad way to get property types
        var propTypes = this._component.constructor && this._component.constructor.propTypes;
        xblocks.dom.attrs.typeConversion(nextProps, propTypes);

        this._component[action](nextProps, this._callbackUpdate.bind(this, callback));
    }
};

/**
 * @param {object} [props]
 * @param {string} [children]
 * @param {function} [callback]
 * @private
 */
xblocks.element.prototype._init = function(props, children, callback) {
    if (this._isMountedComponent()) {
        return;
    }

    props._uid = this._uid;

    var constructor = xblocks.view.get(this._name);
    // TODO bad way to get property types
    var propTypes = constructor.originalSpec && constructor.originalSpec.propTypes;

    xblocks.dom.attrs.typeConversion(props, propTypes);

    var proxyConstructor = constructor(props, children);

    if (props.hasOwnProperty(xblocks.dom.attrs.XB_ATTRS.STATIC)) {
        this.unmount();
        this._node.innerHTML = React.renderComponentToStaticMarkup(proxyConstructor);
        this._upgradeNode();

        if (callback) {
            callback.call(this);
        }

    } else {
        this._component = React.renderComponent(
            proxyConstructor,
            this._node,
            this._callbackRender.bind(this, callback)
        );
    }
};

/**
 * @private
 */
xblocks.element.prototype._repaint = function() {
    var props = xblocks.utils.merge(true, this._getNodeProps(), this._getCurrentProps());
    var children = this._getNodeContent();
    this.destroy();
    this._init(props, children, this._callbackRepaint);
};

/**
 * @private
 */
xblocks.element.prototype._callbackInit = function() {
    xblocks.utils.dispatchEvent(this._node, 'xb-created', { detail: { xblock: this } });
    xblocks.utils.lazy(_globalInitEvent, this._node);
};

/**
 * @private
 */
xblocks.element.prototype._callbackRepaint = function() {
    xblocks.utils.dispatchEvent(this._node, 'xb-repaint', { detail: { xblock: this } });
    xblocks.utils.lazy(_globalRepaintEvent, this._node);
};

/**
 * @param {function} [callback]
 * @private
 */
xblocks.element.prototype._callbackRender = function(callback) {
    this._upgradeNode();

    if (!this._observer) {
        this._observer = new MutationObserver(this._callbackMutation.bind(this));
    }

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
xblocks.element.prototype._callbackMutation = function(records) {
    if (!this._isMountedComponent()) {
        return;
    }

    // full repaint
    if (records.some(this._checkNodeChange)) {
        this._repaint();

    } else if (records.some(this._checkAttributesChange)) {

        var removeAttrs = records
            .filter(this._filterAttributesRemove, this)
            .map(this._mapAttributesName);

        this.update(null, removeAttrs);
    }
};

/**
 * @param {function} [callback]
 * @private
 */
xblocks.element.prototype._callbackUpdate = function(callback) {
    this._upgradeNode();
    if (callback) {
        callback.call(this);
    }
};

/**
 * @private
 */
xblocks.element.prototype._upgradeNode = function() {
    xblocks.utils.upgradeElements(this._node);
};

/**
 * @returns {object}
 */
xblocks.element.prototype._getNodeProps = function() {
    return xblocks.dom.attrs.toObject(this._node);
};

/**
 * @returns {?HTMLElement}
 * @private
 */
xblocks.element.prototype._getNodeContentElement = function() {
    if (!this._node.childNodes.length) {
        return null;
    }

    var element = this._node.querySelector('[data-xb-content="' + this._uid + '"]');

    if (!element) {
        element = this._node.querySelector('script[type="text/template"]');

        if (xblocks.utils.support.template && (!element || element.parentNode !== this._node)) {
            element = this._node.querySelector('template');

            if (element && element.parentNode === this._node) {
                // FIXME temporarily, until the implementation of the DocumentFragment
                var tmp = global.document.createElement('div');
                tmp.appendChild(global.document.importNode(element.content, true));
                element = tmp;
            }
        }
    }

    return element;
};

/**
 * @returns {string}
 * @private
 */
xblocks.element.prototype._getNodeContent = function() {
    if (this._isMountedComponent()) {
        return this._component.props.children;
    }

    var contentElement = this._getNodeContentElement();
    if (contentElement) {
        return contentElement.innerHTML;
    }

    return this._node.innerHTML;
};

/**
 * @param {string} content
 * @private
 */
xblocks.element.prototype._setNodeContent = function(content) {
    if (this._isMountedComponent()) {
        this.update({ children: content });

    } else {
        var contentElement = this._getNodeContentElement();
        if (contentElement) {
            contentElement.innerHTML = content;
            this._upgradeNode();
        }
    }
};

/**
 *
 * @returns {boolean}
 * @private
 */
xblocks.element.prototype._isMountedComponent = function() {
    return (this._component && this._component.isMounted());
};

/**
 * @returns {?object}
 * @private
 */
xblocks.element.prototype._getCurrentProps = function() {
    return this._isMountedComponent() ? this._component.props : null;
};

/**
 * @param {MutationRecord} record
 * @returns {boolean}
 * @private
 */
xblocks.element.prototype._checkNodeChange = function(record) {
    return (record.type === 'childList');
};

/**
 * @param {MutationRecord} record
 * @returns {boolean}
 * @private
 */
xblocks.element.prototype._checkAttributesChange = function(record) {
    return (record.type === 'attributes');
};

/**
 * @param {MutationRecord} record
 * @returns {boolean}
 * @private
 */
xblocks.element.prototype._filterAttributesRemove = function(record) {
    return (record.type === 'attributes' && !this._node.hasAttribute(record.attributeName));
};

/**
 * @param {MutationRecord} record
 * @returns {string}
 * @private
 */
xblocks.element.prototype._mapAttributesName = function(record) {
    return record.attributeName;
};

/**
 * @param {array} records
 * @private
 */
function _globalInitEvent(records) {
    xblocks.utils.dispatchEvent(global, 'xb-created', { detail: { records: records } });
}

/**
 * @param {array} records
 * @private
 */
function _globalRepaintEvent(records) {
    xblocks.utils.dispatchEvent(global, 'xb-repaint', { detail: { records: records } });
}
