import context from '../../context';

const proto = context.Element.prototype;
const createShadowRoot = proto.createShadowRoot ||
    proto.webkitCreateShadowRoot ||
    proto.mozCreateShadowRoot ||
    proto.msCreateShadowRoot ||
    proto.oCreateShadowRoot ||
    function () {};

/**
 * Creating a shadow root.
 * Does not create the existing shadow root.
 *
 * @example
 * import createShadowRoot from 'xblocks-core/utils/createShadowRoot';
 * var root = createShadowRoot(node);
 *
 * @module xblocks-core/utils/createShadowRoot
 * @param {HTMLElement} node
 * @returns {ShadowRoot}
 */
export default function (node) {
    return node.shadowRoot || createShadowRoot.call(node);
}
