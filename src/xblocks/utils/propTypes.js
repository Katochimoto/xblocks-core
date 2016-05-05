import { getClass } from '../view';

/**
 * Description React component properties.
 *
 * @example
 * import propTypes from 'xblocks-core/utils/propTypes';
 * console.log(propTypes('x-element'));
 * // Object { _uid: function() ... }
 *
 * @module xblocks-core/utils/propTypes
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
