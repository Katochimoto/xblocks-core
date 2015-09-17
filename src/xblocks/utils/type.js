'use strict';

var regType = /\s([a-zA-Z]+)/;

/**
 * The definition of the data type
 * @function xblocks.utils.type
 * @param {*} param
 * @returns {string}
 */
module.exports = function (param) {
    if (param === undefined) {
        return 'undefined';
    }

    if (param === null) {
        return 'null';
    }

    var type = typeof param;

    if (type === 'object') {
        type = Object.prototype.toString.call(param)
            .match(regType)[1]
            .toLowerCase();
    }

    if (type === 'number') {
        var paramStr = param.toString();
        if (paramStr === 'NaN') {
            type = 'NaN';

        } else {
            type = paramStr.indexOf('.') === -1 ? 'integer' : 'float';
        }
    }

    return type;
};
