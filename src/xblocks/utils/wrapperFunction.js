import isFunction from 'lodash/isFunction';

/**
 * Implementation of inherited function.
 *
 * @example
 * // call objFunc, srcFunc
 * _.wrap(objFunc, _.wrap(srcFunc, wrapperFunction));
 *
 * @module xblocks-core/utils/wrapperFunction
 * @param {function} [srcFunc]
 * @param {function} [objFunc]
 * @param {...*} args
 * @private
 */
export default function (srcFunc, objFunc, ...args) {
    if (isFunction(objFunc)) {
        objFunc.apply(this, args);
    }

    if (isFunction(srcFunc)) {
        srcFunc.apply(this, args);
    }
}
