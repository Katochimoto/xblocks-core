'use strict';

var context = require('context');

/**
 * @function xblocks.dom.outerHTML
 * @prop {object} xblocks.dom.outerHTML
 * @prop {function} xblocks.dom.outerHTML.get
 * @prop {function} xblocks.dom.outerHTML.set
 */
module.exports = (function () {

    var container = context.document.createElementNS('http://www.w3.org/1999/xhtml', '_');
    var getter;
    var setter;

    if (container.hasOwnProperty('outerHTML')) {
        getter = function () {
            return this.outerHTML;
        };

        setter = function (html) {
            this.outerHTML = html;
        };

    } else {
        var serializer = context.XMLSerializer && (new context.XMLSerializer());
        var xmlns = /\sxmlns=\"[^\"]+\"/;

        if (serializer) {
            getter = function () {
                return serializer.serializeToString(this).replace(xmlns, '');
            };

        } else {
            getter = function () {
                container.appendChild(this.cloneNode(false));
                var html = container.innerHTML.replace('><', '>' + this.innerHTML + '<');
                container.innerHTML = '';
                return html;
            };
        }

        setter = function (html) {
            var node = this;
            var parent = node.parentNode;
            var child;

            if (!parent) {
                context.DOMException.code = context.DOMException.NOT_FOUND_ERR;
                throw context.DOMException;
            }

            container.innerHTML = html;

            while ((child = container.firstChild)) {
                parent.insertBefore(child, node);
            }

            parent.removeChild(node);
        };
    }

    return {
        'get': getter,
        'set': setter
    };

}());
