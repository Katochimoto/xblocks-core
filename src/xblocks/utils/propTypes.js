/* global xblocks */
/* jshint strict: false */

/**
 * @param {string} tagName
 * @returns {object}
 */
xblocks.utils.propTypes = function(tagName) {
    var view = xblocks.view.get(tagName);
    return (view && (view.propTypes || (view.originalSpec && view.originalSpec.propTypes))) || {};
};
