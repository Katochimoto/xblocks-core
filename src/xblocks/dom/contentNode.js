/* global xblocks */
/* jshint strict: false */

/**
 * @param {HTMLElement} node
 * @returns {HTMLElement}
 */
xblocks.dom.contentNode = function(node) {
    var element;

    if (node.xuid && node.nodeType === 1 && node.hasChildNodes()) {
        element = xblocks.dom.querySelector(node, '[data-xb-content="' + node.xuid + '"]');

        if (!element) {
            element = xblocks.dom.querySelector(node, 'script[type="text/x-template"]:not([ref]),template:not([ref])');
        }
    }

    return element || node;
};
