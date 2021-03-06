import context from '../../context';

const elementProto = (context.HTMLElement || context.Element).prototype;

/**
 * Cloning node.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Node.cloneNode
 * @module xblocks-core/dom/cloneNode
 * @param {HTMLElement} node the node to be cloned
 * @param {boolean} deep true if the children of the node should also be cloned,
 * or false to clone only the specified node.
 * @returns {HTMLElement} The new node that will be a clone of node
 */
export default function (node, deep) {
    // FireFox19 cannot use native cloneNode the Node object
    return elementProto.cloneNode.call(node, deep);

    /*
    try {
        // FireFox19 cannot use native cloneNode the Node object
        return elementProto.cloneNode.call(node, deep);
    } catch(e) {
        // FireFox <=13
        // uncaught exception: [Exception... "Could not convert JavaScript argument"
        // nsresult: "0x80570009 (NS_ERROR_XPC_BAD_CONVERT_JS)"
        return node.ownerDocument.importNode(node, deep);
    }
    */
}
