/* global xblocks, React, ReactMount */
/* jshint strict: false */

/**
 * @namespace
 */
xblocks.react = xblocks.react || {};

xblocks.react.renderToStaticMarkup = (React.renderToStaticMarkup || React.renderComponentToStaticMarkup).bind(React);
xblocks.react.render = (React.render || React.renderComponent).bind(React);
xblocks.react.unmountComponentAtNode = React.unmountComponentAtNode.bind(React);

/**
 * @param {String} rootNodeID
 * @returns {HTMLElement}
 */
xblocks.react.findContainerForID = function(rootNodeID) {
    return ReactMount.findReactContainerForID(rootNodeID);
};

/**
 * @param {HTMLElement} node
 * @returns {HTMLElement}
 */
xblocks.react.findContainerForNode = function(node) {
    var reatId = xblocks.react.getID(node);
    return (reatId && xblocks.react.findContainerForID(reatId));
};

/**
 * @param {HTMLElement} node
 * @returns {?String}
 */
xblocks.react.getRootID = function(node) {
    var rootElement = xblocks.react.getRootElementInContainer(node);
    return rootElement && xblocks.react.getID(rootElement);
};

/**
 * @param {String} rootId
 * @returns {?Object}
 */
xblocks.react.getInstancesByRootID = function(rootId) {
    return ReactMount._instancesByReactRootID[ rootId ];
};

/**
 * FIXME check after update React !!
 * @param {HTMLElement} node
 * @returns {?HTMLElement}
 */
xblocks.react.getRootElementInContainer = function(node) {
    if (!node) {
        return null;
    }

    if (node.nodeType === 9) {
        return node.documentElement;
    } else {
        return node.firstChild;
    }
};

/**
 * FIXME check after update React !!
 * @param {HTMLElement} node
 * @returns {?String}
 */
xblocks.react.getID = function(node) {
    return node && node.getAttribute && node.getAttribute('data-reactid') || '';
};
