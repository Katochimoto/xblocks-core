/* global xblocks, React */
/* jshint strict: false */

/**
 * @namespace
 */
xblocks.react = xblocks.react || {};

/**
 * @param {String} rootNodeID
 * @returns {HTMLElement}
 */
xblocks.react.findContainerForID = function(rootNodeID) {
    return React.__internals.Mount.findReactContainerForID(rootNodeID);
};

/**
 * @param {HTMLElement} node
 * @returns {HTMLElement}
 */
xblocks.react.findReactContainerForNode = function(node) {
    var reatId = xblocks.react.getID(node);
    return (reatId && xblocks.react.findContainerForID(reatId));
};

/**
 * @param {HTMLElement} node
 * @returns {?String}
 */
xblocks.react.getReactRootID = function(node) {
    var rootElement = xblocks.react.getRootElementInContainer(node);
    return rootElement && xblocks.react.getID(rootElement);
};

/**
 * @param {String} rootId
 * @returns {?Object}
 */
xblocks.react.getInstancesByReactRootID = function(rootId) {
    return React.__internals.Mount._instancesByReactRootID[ rootId ];
};

/**
 * FIXME check after update React !!
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
 * FIXME check after update React !!
 * @param {HTMLElement} node
 * @returns {?String}
 */
xblocks.react.getID = function(node) {
    return node && node.getAttribute && node.getAttribute('data-reactid') || '';
};
