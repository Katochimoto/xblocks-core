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
