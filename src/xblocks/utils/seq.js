'use strict';

var i = 0;

/**
 * The generator is a unique sequence of positive numbers
 *
 * @example
 * xblocks.utils.seq()
 * // 1
 * xblocks.utils.seq()
 * // 2
 *
 * @function xblocks.utils.seq
 * @returns {number} a unique, incremental positive number
 */
module.exports = function() {
    return ++i;
};
