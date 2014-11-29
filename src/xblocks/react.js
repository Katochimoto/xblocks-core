/* global xblocks, React */
/* jshint strict: false */

/**
 * NOTE check after update React !!
 */

/**
 * @namespace
 */
xblocks.react = xblocks.react || {};

xblocks.react._idAttributeName = 'data-reactid';

xblocks.react._separator = '.';

var _containersByReactRootID = {};

/**
 * @param {HTMLElement} node
 * @returns {Boolean}
 */
xblocks.react.unmountComponentAtNode = function(node) {
    var rootId = xblocks.react.getRootID(node);

    if (React.unmountComponentAtNode(node)) {
        delete _containersByReactRootID[ rootId ];
        return true;
    }

    return false;
};

/**
 * @param {Object} nextElement
 * @param {HTMLElement} container
 * @param {Function} [callback]
 * @returns {Object}
 */
xblocks.react.render = function(nextElement, container, callback) {
    var component = React.render(nextElement, container, callback);
    _containersByReactRootID[ component._rootNodeID ] = container;
    return component;
};

/**
 * @param {String} id
 * @returns {HTMLElement}
 */
xblocks.react.findContainerForID = function(id) {
    var rootId = xblocks.react.getReactRootIDFromNodeID(id);
    return _containersByReactRootID[ rootId ];
};

/**
 * @param {HTMLElement} node
 * @returns {HTMLElement}
 */
xblocks.react.findContainerForNode = function(node) {
    var id = xblocks.react.getID(node);
    return (id && xblocks.react.findContainerForID(id));
};

/**
 * @param {String} rootId
 * @returns {?Object}
 */
/*xblocks.react.getInstancesByRootID = function(rootId) {
    return ReactMount._instancesByReactRootID[ rootId ];
};*/

/**
 * @param {HTMLElement} node
 * @returns {?String}
 */
xblocks.react.getRootID = function(node) {
    var rootElement = xblocks.react.getRootElementInContainer(node);
    return rootElement && xblocks.react.getID(rootElement);
};

/**
 * @param {HTMLElement} node
 * @returns {?HTMLElement}
 */
xblocks.react.getRootElementInContainer = function(node) {
    if (!node) {
        return null;
    }

    if (node.nodeType === 9) {
        return node.documentElement;
    } else {
        return node.firstChild;
    }
};

/**
 * @param {HTMLElement} node
 * @returns {?String}
 */
xblocks.react.getID = function(node) {
    return (node && node.getAttribute && node.getAttribute(xblocks.react._idAttributeName) || '');
};

/**
 * @param {String} id
 * @returns {?String}
 */
xblocks.react.getReactRootIDFromNodeID = function(id) {
    if (id && id.charAt(0) === xblocks.react._separator && id.length > 1) {
        var index = id.indexOf(xblocks.react._separator, 1);
        return index > -1 ? id.substr(0, index) : id;
    }
    return null;
};
