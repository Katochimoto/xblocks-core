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
 * @returns {?String}
 */
xblocks.utils.react.getReactRootID = function(node) {
    return React.__internals.Mount.getReactRootID(node);
};

/**
 * @param {String} rootId
 * @returns {?Object}
 */
xblocks.utils.react.getInstancesByReactRootID = function(rootId) {
    return React.__internals.Mount._instancesByReactRootID[ rootId ];
};
