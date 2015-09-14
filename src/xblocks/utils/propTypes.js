'use strict';

var view = require('../view');

/**
 * @function xblocks.utils.propTypes
 * @param {string} tagName
 * @returns {object}
 */
module.exports = function(tagName) {
    var view = view.getClass(tagName);

    if (!view) {
        return {};
    }

    if (view.propTypes) {
        return view.propTypes;
    }

    if (view.originalSpec && view.originalSpec.propTypes) {
        return view.originalSpec.propTypes;
    }

    return {};
};
