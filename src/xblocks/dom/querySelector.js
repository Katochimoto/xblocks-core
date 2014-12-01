/* global xblocks */
/* jshint strict: false */

/**
* @param {HTMLElement} node
* @param {String} selector
* @returns {NodeList}
*/
xblocks.dom.querySelector = function(node, selector) {
    try {
        return node.querySelector(selector);
    } catch (e) {
        return node.ownerDocument.importNode(node, true).querySelector(selector);
    }
};
