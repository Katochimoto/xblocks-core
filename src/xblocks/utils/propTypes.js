/* global xblocks */
/* jshint strict: false */

/**
 * @param {string} tagName
 * @returns {object}
 */
xblocks.utils.propTypes = function(tagName) {
    return xblocks.view.get(tagName).originalSpec.propTypes || {};
};
