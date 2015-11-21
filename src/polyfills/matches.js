'use strict';

var context = require('../context');
var indexOf = Array.prototype.indexOf;
var proto = context.Element.prototype;

proto.matches = proto.matches ||
    proto.matchesSelector ||
    proto.webkitMatchesSelector ||
    proto.mozMatchesSelector ||
    proto.msMatchesSelector ||
    proto.oMatchesSelector ||
    function (selector) {
        return (indexOf.call((this.parentNode || this.ownerDocument).querySelectorAll(selector), this) !== -1);
    };

module.exports = proto.matches;
