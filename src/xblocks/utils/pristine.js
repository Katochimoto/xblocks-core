'use strict';

var context = require('context');
var regPristine = /^[\$_a-z][\$\w]*$/i;

/**
 * Check the override method
 * @function xblocks.utils.pristine
 * @param {string} methodName method name
 * @returns {boolean} true if the method is not overridden
 */
module.exports = function (methodName) {
    if (!methodName) {
        return false;
    }

    var method = context[ methodName ];

    if (!method) {
        return false;
    }

    if (!regPristine.test(methodName)) {
        return false;
    }

    var type = typeof method;

    if (type !== 'function' && type !== 'object') {
        return false;
    }

    var re = new RegExp('function\\s+' + methodName + '\\(\\s*\\)\\s*{\\s*\\[native code\\]\\s*}');

    if (!re.test(method)) {
        return false;
    }

    if (type === 'function') {
        if (!method.valueOf || method.valueOf() !== method) {
            return false;
        }
    }

    return true;
};
