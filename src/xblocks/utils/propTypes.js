'use strict';

var view = require('../view');

/**
 * @function xblocks.utils.propTypes
 * @param {string} tagName
 * @returns {object}
 */
module.exports = function (tagName) {
    var viewClass = view.getClass(tagName);

    if (!viewClass) {
        return {};
    }

    if (viewClass.propTypes) {
        return viewClass.propTypes;
    }

    if (viewClass.originalSpec && viewClass.originalSpec.propTypes) {
        return viewClass.originalSpec.propTypes;
    }

    return {};
};
