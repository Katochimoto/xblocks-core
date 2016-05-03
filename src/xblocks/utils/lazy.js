import immediate from 'setimmediate2/src';

/**
 * Deferred execution.
 *
 * @example
 * import lazy from 'xblocks/utils/lazy';
 *
 * var lazyCallback = function () {
 *     console.log(arguments);
 * };
 *
 * lazy(lazyCallback, 'a');
 * lazy(lazyCallback, 'b');
 * lazy(lazyCallback, 'c');
 * // [ Array[ 'a', 'b', 'c' ] ]
 *
 * @module xblocks/utils/lazy
 * @param {function} callback
 * @param {*} args
 * @returns {function}
 */
export default function (callback, args) {
    if (!callback._args) {
        callback._args = [];
    }

    callback._args.push(args);

    if (!callback._timer) {
        callback._timer = immediate.setImmediate(function () {
            callback._timer = 0;

            const saveArgs = callback._args;
            callback._args = [];

            callback(saveArgs);
        });
    }

    return callback;
}
