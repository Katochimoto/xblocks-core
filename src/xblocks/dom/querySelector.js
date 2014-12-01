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
        // FireFox 10
        // uncaught exception: [Exception... "Could not convert JavaScript argument"  nsresult: "0x80570009 (NS_ERROR_XPC_BAD_CONVERT_JS)"
        return node.ownerDocument.importNode(node, true).querySelector(selector);
    }
};
