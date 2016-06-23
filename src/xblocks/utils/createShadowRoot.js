import context from '../../context';

const proto = context.Element.prototype;
const createShadowRoot = proto.createShadowRoot ||
    proto.webkitCreateShadowRoot ||
    proto.mozCreateShadowRoot ||
    proto.msCreateShadowRoot ||
    proto.oCreateShadowRoot ||
    function () {};

export default function (node) {
    return node.shadowRoot || createShadowRoot.call(node);
}
