/* global xblocks */
/* jshint strict: false */

/**
* @param {HTMLElement} node
* @param {String} selector
* @returns {NodeList}
*/
xblocks.dom.querySelectorAll = function(node, selector) {
    try {
        return node.querySelectorAll(selector);
    } catch (e) {
        return node.ownerDocument.importNode(node, true).querySelectorAll(selector);
    }
};
