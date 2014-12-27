/* global xblocks */
/* jshint strict: false */

/**
* @param {HTMLElement} node
* @param {Boolean} deep
* @returns {NodeList}
*/
xblocks.dom.cloneNode = function(node, deep) {
    try {
        // FireFox19 cannot use native cloneNode the Node object
        return xblocks.dom.ELEMENT_PROTO.cloneNode.call(node, deep);
    } catch(e) {
        // FireFox <=13
        // uncaught exception: [Exception... "Could not convert JavaScript argument"  nsresult: "0x80570009 (NS_ERROR_XPC_BAD_CONVERT_JS)"
        return node.ownerDocument.importNode(node, deep);
    }
};
