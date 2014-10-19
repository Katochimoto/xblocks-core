/* global xblocks, global, React */
/* jshint strict: false */

var _elementStatic = {
    /**
     * @param {MutationRecord} record
     * @returns {boolean}
     * @private
     */
    checkNodeChange: function(record) {
        return (record.type === 'childList');
    },

    /**
     * @param {MutationRecord} record
     * @returns {boolean}
     * @private
     */
    checkAttributesChange: function(record) {
        return (record.type === 'attributes');
    },

    /**
     * @param {MutationRecord} record
     * @returns {boolean}
     * @private
     */
    filterAttributesRemove: function(record) {
        return (record.type === 'attributes' && !this._node.hasAttribute(record.attributeName));
    },

    /**
     * @param {MutationRecord} record
     * @returns {string}
     * @private
     */
    mapAttributesName: function(record) {
        return record.attributeName;
    },

    /**
     * @param {array} records
     * @private
     */
    globalInitEvent: function(records) {
        xblocks.utils.dispatchEvent(global, 'xb-created', { detail: { records: records } });
    },

    /**
     * @param {array} records
     * @private
     */
    globalRepaintEvent: function(records) {
        xblocks.utils.dispatchEvent(global, 'xb-repaint', { detail: { records: records } });
    }

    /**
     * @param {array} records
     * @private
     */
    //globalUpdateEvent: function(records) {
    //    xblocks.utils.dispatchEvent(global, 'xb-update', { detail: { records: records } });
    //}
};

/**
 * @param {HTMLElement} node
 * @constructor
 */
xblocks.element = function(node) {
    node.xblock = this;
    this._node = node;
    this._init(node.state, node.content, this._callbackInit);
};

/**
 * @param {HTMLElement} node
 * @returns {xblocks.element}
 */
xblocks.element.create = function(node) {
    return new xblocks.element(node);
};

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

    if (this.isMounted()) {
        this._component.unmountComponent();
    }

    this._component = null;
};

/**
 * @param {object} [props]
 * @param {Array} [removeProps]
 * @param {function} [callback]
 */
xblocks.element.prototype.update = function(props, removeProps, callback) {
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
        nextProps = xblocks.utils.merge(true, {}, this.getMountedProps(), nextProps);

        var l = removeProps.length;
        while (l--) {
            if (nextProps.hasOwnProperty(removeProps[l])) {
                delete nextProps[ removeProps[l] ];
            }
        }
    }

    if (nextProps.hasOwnProperty(xblocks.dom.attrs.XB_ATTRS.STATIC)) {
        this.repaint(callback);

    } else {
        xblocks.dom.attrs.typeConversion(nextProps, this._node.xprops);
        this._component[ action ](nextProps, this._callbackUpdate.bind(this, callback));
    }
};

/**
 * @param {function} [callback]
 */
xblocks.element.prototype.repaint = function(callback) {
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
 *
 * @returns {boolean}
 */
xblocks.element.prototype.isMounted = function() {
    return Boolean(this._component && this._component.isMounted());
};

xblocks.element.prototype.setMountedContent = function(content) {
    if (this.isMounted()) {
        this.update({ 'children': content });
    }
};

xblocks.element.prototype.getMountedContent = function() {
    if (this.isMounted()) {
        return this._component.props.children;
    }
};

/**
 * @returns {?object}
 */
xblocks.element.prototype.getMountedProps = function() {
    return this.isMounted() ? this._component.props : null;
};

/**
 * @param {object} [props]
 * @param {string} [children]
 * @param {function} [callback]
 * @private
 */
xblocks.element.prototype._init = function(props, children, callback) {
    if (this.isMounted()) {
        return;
    }

    // FIXME need more tests
    // only polyfill
    // internal elements are re-created, while retaining component reference react that you created earlier
    // possible solutions: to use the tag <template> or <script> for the inner elements
    // example:
    // <xb-menu>
    //   <template>
    //     <xb-menuitem></xb-menuitem>
    //     <xb-menuitem></xb-menuitem>
    //     <xb-menuitem></xb-menuitem>
    //   </template>
    // </xb-menu>
    if (!global.CustomElements.useNative) {
        var reactId = xblocks.utils.react.getReactRootID(this._node);
        if (reactId) {
            var reactNode = xblocks.utils.react.findReactContainerForID(reactId);
            if (reactNode !== this._node) {
                var oldProxyConstructor = xblocks.utils.react.getInstancesByReactRootID(reactId);
                if (oldProxyConstructor && oldProxyConstructor.isMounted()) {
                    children = oldProxyConstructor.props.children || '';
                    React.unmountComponentAtNode(reactNode);
                    this._node.innerHTML = '';
                }
            }
        }
    }

    props._uid = this._node.xuid;
    xblocks.dom.attrs.typeConversion(props, this._node.xprops);

    var proxyConstructor = xblocks.view.get(this._node.xtagName)(props, children);

    if (props.hasOwnProperty(xblocks.dom.attrs.XB_ATTRS.STATIC)) {
        this.unmount();
        xblocks.utils.log.time(this._node, 'react_render');
        this._node.innerHTML = React.renderComponentToStaticMarkup(proxyConstructor);
        xblocks.utils.log.time(this._node, 'react_render');
        this._node.upgrade();

        if (callback) {
            callback.call(this);
        }

    } else {
        xblocks.utils.log.time(this._node, 'react_render');
        var that = this;
        this._component = React.renderComponent(
            proxyConstructor,
            this._node,
            function() {
                xblocks.utils.log.time(that._node, 'react_render');
                that._component = this;
                that._callbackRender(callback);
            }
        );
    }
};

/**
 * @private
 */
xblocks.element.prototype._callbackInit = function() {
    xblocks.utils.dispatchEvent(this._node, 'xb-created');
    xblocks.utils.lazy(_elementStatic.globalInitEvent, this._node);
    xblocks.utils.log.time(this._node, 'xb_init');
};

/**
 * @param {function} [callback]
 * @private
 */
xblocks.element.prototype._callbackRepaint = function(callback) {
    xblocks.utils.dispatchEvent(this._node, 'xb-repaint');
    xblocks.utils.lazy(_elementStatic.globalRepaintEvent, this._node);

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
        this._observer = new global.MutationObserver(this._callbackMutation.bind(this));
    }

    this._observer.observe(this._node, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: false,
        attributeOldValue: false,
        characterDataOldValue: false,
        attributeFilter: Object.keys(this._node.xprops)
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
    if (!this.isMounted()) {
        return;
    }

    // full repaint
    if (records.some(_elementStatic.checkNodeChange)) {
        this.repaint();

    } else if (records.some(_elementStatic.checkAttributesChange)) {

        var removeAttrs = records
            .filter(_elementStatic.filterAttributesRemove, this)
            .map(_elementStatic.mapAttributesName);

        this.update(null, removeAttrs);
    }
};

/**
 * @param {function} [callback]
 * @private
 */
xblocks.element.prototype._callbackUpdate = function(callback) {
    this._node.upgrade();

    xblocks.utils.dispatchEvent(this._node, 'xb-update');
    //xblocks.utils.lazy(_elementStatic.globalUpdateEvent, this._node);

    if (callback) {
        callback.call(this);
    }
};
