//jscs:disable
/* global xblocks */
/* jshint strict: false */
//jscs:enable

/**
 * @param {string} tagName
 * @returns {object}
 */
xblocks.utils.propTypes = function(tagName) {
    var view = xblocks.view.getClass(tagName);

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
