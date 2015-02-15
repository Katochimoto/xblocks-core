/* global xblocks, global */
/* jshint strict: false */

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
        callback._timer = global.setImmediate(function() {
            callback._timer = 0;

            var args = callback._args;
            callback._args = [];

            callback(args);
        });
    }

    return callback;
};
