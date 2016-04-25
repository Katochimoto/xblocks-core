import context from '../../context';

/**
 * Obtaining and installing external HTML.
 * @module xblocks/dom/outerHTML
 */
export default (function () {

    let container = context.document.createElementNS('http://www.w3.org/1999/xhtml', '_');
    let getter;
    let setter;

    if (container.hasOwnProperty('outerHTML')) {
        getter = function () {
            return this.outerHTML;
        };

        setter = function (html) {
            this.outerHTML = html;
        };

    } else {
        const serializer = context.XMLSerializer && (new context.XMLSerializer());
        const xmlns = /\sxmlns=\"[^\"]+\"/;

        if (serializer) {
            getter = function () {
                return serializer.serializeToString(this).replace(xmlns, '');
            };

        } else {
            getter = function () {
                container.appendChild(this.cloneNode(false));
                const html = container.innerHTML.replace('><', `>${this.innerHTML}<`);
                container.innerHTML = '';
                return html;
            };
        }

        setter = function (html) {
            let node = this;
            let parent = node.parentNode;
            let child;

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
        /**
         * Obtaining external HTML.
         * @alias module:xblocks/dom/outerHTML.get
         * @function
         * @returns {string}
         */
        'get': getter,

        /**
         * Installing external HTML.
         * @alias module:xblocks/dom/outerHTML.set
         * @function
         * @param {string} html
         */
        'set': setter
    };

}());
