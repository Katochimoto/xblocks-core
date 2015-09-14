'use strict';

/**
 * @function xblocks.dom.contentNode
 * @param {HTMLElement} node
 * @returns {HTMLElement}
 */
module.exports = function(node) {
    var element;

    if (node.xuid && node.nodeType === 1 && node.hasChildNodes()) {
        element = node.querySelector('[data-xb-content="' + node.xuid + '"]');

        if (!element) {
            element = node.querySelector('script[type="text/x-template"]:not([ref]),template:not([ref])');
        }
    }

    return element || node;
};
