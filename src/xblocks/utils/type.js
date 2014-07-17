/* global xblocks, global */
/* jshint strict: false */

/**
 * @param {*} param
 * @returns {string}
 */
xblocks.utils.type = function(param) {
    if (param === undefined) {
        return 'undefined';
    }

    if (param === null) {
        return 'null';
    }

    var type = typeof(param);

    if (type === 'object') {
        type = Object.prototype.toString.call(param)
            .match(xblocks.utils.REG_TYPE_EXTRACT)[1]
            .toLowerCase();
    }

    if (type === 'number') {
        var paramStr = param.toString();
        if (paramStr === 'NaN') {
            type = 'nan';

        } else {
            type = paramStr.indexOf('.') === -1 ? 'integer' : 'float';
        }
    }

    return type;
};
