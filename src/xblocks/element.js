/* global xblocks, global, React */
/* jshint strict: false */

/**
 * @param {HTMLElement} node
 * @constructor
 */
xblocks.element = function(node) {
    this._name = node.tagName.toLowerCase();
    this._node = node;
    this._propTypes = xblocks.utils.propTypes(this._name);
    this._init(node.attrs, node.content, this._callbackInit);
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
 * @type {object}
 * @private
 */
xblocks.element.prototype._propTypes = undefined;

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
 * @param {Array} [removeProps]
 * @param {function} [callback]
 */
xblocks.element.prototype.update = function(props, removeProps, callback) {
    if (!this._isMountedComponent()) {
        return;
    }

    var nextProps = this._node.attrs;
    var action = 'setProps';

    xblocks.utils.merge(true, nextProps, props);

    // merge of new and current properties
    // and the exclusion of remote properties
    if (Array.isArray(removeProps) && removeProps.length) {
        action = 'replaceProps';
        var currentProps = this._getCurrentProps();
        nextProps = xblocks.utils.merge(true, currentProps, nextProps);
        nextProps = xblocks.utils.filterObject(nextProps, function(name) {
            return (removeProps.indexOf(name) === -1);
        });
    }

    if (nextProps.hasOwnProperty(xblocks.dom.attrs.XB_ATTRS.STATIC)) {
        this._repaint(callback);

    } else {
        xblocks.dom.attrs.typeConversion(nextProps, this._propTypes);
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

    props._uid = this._node.xuid;
    xblocks.dom.attrs.typeConversion(props, this._propTypes);

    var proxyConstructor = xblocks.view.get(this._name)(props, children);

    if (props.hasOwnProperty(xblocks.dom.attrs.XB_ATTRS.STATIC)) {
        this.unmount();
        this._node.innerHTML = React.renderComponentToStaticMarkup(proxyConstructor);
        this._node.upgrade();

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
 * @param {function} [callback]
 * @private
 */
xblocks.element.prototype._repaint = function(callback) {
    var props = xblocks.utils.merge(true, this._node.attrs, this._getCurrentProps());
    var children = this._node.content;
    this.destroy();
    this._init(props, children, this._callbackRepaint.bind(this, callback));
};

/**
 * @private
 */
xblocks.element.prototype._callbackInit = function() {
    xblocks.utils.dispatchEvent(this._node, 'xb-created', { detail: { xblock: this } });
    xblocks.utils.lazy(_elementGlobalInitEvent, this._node);
};

/**
 * @param {function} [callback]
 * @private
 */
xblocks.element.prototype._callbackRepaint = function(callback) {
    xblocks.utils.dispatchEvent(this._node, 'xb-repaint', { detail: { xblock: this } });
    xblocks.utils.lazy(_elementGlobalRepaintEvent, this._node);

    if (callback) {
        callback.call(this);
    }
};

/**
 * @param {function} [callback]
 * @private
 */
xblocks.element.prototype._callbackRender = function(callback) {
    this._node.upgrade();

    if (!this._observer) {
        this._observer = new MutationObserver(this._callbackMutation.bind(this));
    }

    this._observer.observe(this._node, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: false,
        attributeOldValue: false,
        characterDataOldValue: false,
        attributeFilter: Object.keys(this._propTypes)
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
    this._node.upgrade();
    if (callback) {
        callback.call(this);
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
function _elementGlobalInitEvent(records) {
    xblocks.utils.dispatchEvent(global, 'xb-created', { detail: { records: records } });
}

/**
 * @param {array} records
 * @private
 */
function _elementGlobalRepaintEvent(records) {
    xblocks.utils.dispatchEvent(global, 'xb-repaint', { detail: { records: records } });
}
