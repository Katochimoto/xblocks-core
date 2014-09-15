/* global xblocks, React */
/* jshint strict: false */

/**
 * @param {String} rootNodeID
 * @returns {HTMLElement}
 */
xblocks.utils.findReactContainerForID = function(rootNodeID) {
    return React.__internals.Mount.findReactContainerForID(rootNodeID);
};
