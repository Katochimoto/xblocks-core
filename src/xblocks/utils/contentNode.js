/* global xblocks, global */
/* jshint strict: false */

/**
 * @param {HTMLElement} node
 * @returns {HTMLElement}
 */
xblocks.utils.contentNode = function(node) {
    var element;

    if (node.xuid && node.nodeType === 1 && node.hasChildNodes()) {
        element = node.querySelector('[data-xb-content="' + node.xuid + '"]');

        if (!element) {
            element = node.querySelector('script[type="text/template"]');

            if (xblocks.utils.support.template && (!element || element.parentNode !== node)) {
                element = node.getElementsByTagName('template')[0];

                if (element && element.parentNode === node) {
                    // FIXME temporarily, until the implementation of the DocumentFragment
                    var tmp = global.document.createElement('div');
                    tmp.appendChild(global.document.importNode(element.content, true));
                    element = tmp;
                }
            }
        }
    }

    return element || node;
};
