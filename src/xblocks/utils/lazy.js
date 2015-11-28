import immediate from 'setimmediate2/src';

/**
 * Deferred execution
 *
 * @example
 * var lazyCallback = function () {
 *     console.log(arguments);
 * };
 * xblocks.utils.lazy(lazyCallback, 'a');
 * xblocks.utils.lazy(lazyCallback, 'b');
 * xblocks.utils.lazy(lazyCallback, 'c');
 * // ....
 * [ Array[ 'a', 'b', 'c' ] ]
 *
 * @function xblocks.utils.lazy
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

            var saveArgs = callback._args;
            callback._args = [];

            callback(saveArgs);
        });
    }

    return callback;
}
