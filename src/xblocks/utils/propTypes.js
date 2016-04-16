import { getClass } from '../view';

/**
 * @param {string} [tagName] the name of the new node
 * @returns {Object}
 */
export default function (tagName) {
    const viewClass = tagName && getClass(tagName);

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
}
