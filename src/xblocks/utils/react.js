/* global xblocks, React */
/* jshint strict: false */

xblocks.utils.react = {};

/**
 * @param {String} rootNodeID
 * @returns {HTMLElement}
 */
xblocks.utils.react.findReactContainerForID = function(rootNodeID) {
    return React.__internals.Mount.findReactContainerForID(rootNodeID);
};

/**
 * @param {HTMLElement} node
 * @returns {HTMLElement}
 */
xblocks.utils.react.findReactContainerForNode = function(node) {
    var reatId = xblocks.utils.react.getID(node);
    return (reatId && xblocks.utils.react.findReactContainerForID(reatId));
};

/**
 * @param {HTMLElement} node
 * @returns {?String}
 */
xblocks.utils.react.getReactRootID = function(node) {
    var rootElement = xblocks.utils.react.getRootElementInContainer(node);
    return rootElement && xblocks.utils.react.getID(rootElement);
};

/**
 * @param {String} rootId
 * @returns {?Object}
 */
xblocks.utils.react.getInstancesByReactRootID = function(rootId) {
    return React.__internals.Mount._instancesByReactRootID[ rootId ];
};

/**
 * FIXME check after update React !!
 * @param {HTMLElement} node
 * @returns {?HTMLElement}
 */
xblocks.utils.react.getRootElementInContainer = function(node) {
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
 * FIXME check after update React !!
 * @param {HTMLElement} node
 * @returns {?String}
 */
xblocks.utils.react.getID = function(node) {
    return node && node.getAttribute && node.getAttribute('data-reactid') || '';
};
