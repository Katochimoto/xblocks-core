import intersection from 'lodash/intersection';
import keys from 'lodash/keys';

/**
 * Check override methods.
 *
 * @example
 * import checkOverriddenMethods from './utils/checkOverriddenMethods';
 * // throw
 * checkOverriddenMethods({ a: function() {} }, { a: function() {} });
 *
 * @module xblocks-core/utils/checkOverriddenMethods
 * @param {Object} [objValue]
 * @param {Object} [srcValue]
 * @throws The following methods are overridden
 * @private
 */
export default function (objValue, srcValue) {
    const overriddenMethods = intersection(keys(objValue), keys(srcValue));

    if (overriddenMethods.length) {
        throw new Error(`The following methods are overridden: "${overriddenMethods.join('", "')}"`);
    }
}
