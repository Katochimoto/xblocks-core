/* global xblocks, global */
/* jshint strict: false */

/**
 * @function
 * @private
 */
xblocks.utils._lazy = (function() {
    if (typeof(global.setImmediate) === 'function') {
        return global.setImmediate;

    } else {
        return function(callback) {
            return global.setTimeout(callback, 0);
        };
    }
}());

/**
 * @param {function} callback
 * @param {*} args
 * @returns {function}
 */
xblocks.utils.lazy = function(callback, args) {
    if (!callback._args) {
        callback._args = [];
    }

    callback._args.push(args);

    if (!callback._timer) {
        callback._timer = xblocks.utils._lazy(function() {
            callback._timer = 0;

            var args = callback._args;
            callback._args = [];

            callback(args);
        });
    }

    return callback;
};
