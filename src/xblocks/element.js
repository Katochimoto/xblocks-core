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
     * @param {array} [removeProps]
     */
    XBElement.prototype.update = function(props, removeProps) {
        if (!this._isMountedComponent()) {
            return;
        }

        var nextProps = this._getNodeProps(props);

        if (Array.isArray(removeProps) && removeProps.length) {
            var currentProps = this._getCurrentProps();
            nextProps = xblocks.merge(currentProps, nextProps);
            nextProps = xblocks.filterObject(nextProps, function(name) {
                return removeProps.indexOf(name) === -1;
            });

            this._component.replaceProps(nextProps);

        } else {
            this._component.setProps(nextProps);
        }
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
        var currentProps = this._getCurrentProps();
        this.destroy();
        this._init(currentProps, this._callbackRepaint);
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

    XBElement.prototype._getCurrentProps = function() {
        return this._isMountedComponent() ? this._component.props : null;
    };

    /**
     * @param {MutationRecord} record
     * @returns {boolean}
     * @private
     */
    XBElement.prototype._checkNodeChange = function(record) {
        return (record.type === 'childList');
    };

    /**
     * @param {MutationRecord} record
     * @returns {boolean}
     * @private
     */
    XBElement.prototype._checkAttributesChange = function(record) {
        return (record.type === 'attributes');
    };

    /**
     * @param {MutationRecord} record
     * @returns {boolean}
     * @private
     */
    XBElement.prototype._filterAttributesRemove = function(record) {
        return (record.type === 'attributes' && !this._node.hasAttribute(record.attributeName));
    };

    /**
     * @param {MutationRecord} record
     * @returns {string}
     * @private
     */
    XBElement.prototype._mapAttributesName = function(record) {
        return record.attributeName;
    };

}(xtag, xblocks, React));
