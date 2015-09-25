var view = require('../view');

module.exports = function (tagName) {
    var viewClass = tagName && view.getClass(tagName);

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
