import context from '../context';

const indexOf = Array.prototype.indexOf;
const proto = context.Element.prototype;

proto.matches = proto.matches ||
    proto.matchesSelector ||
    proto.webkitMatchesSelector ||
    proto.mozMatchesSelector ||
    proto.msMatchesSelector ||
    proto.oMatchesSelector ||
    function (selector) {
        return (indexOf.call((this.parentNode || this.ownerDocument).querySelectorAll(selector), this) !== -1);
    };

export default proto.matches;
