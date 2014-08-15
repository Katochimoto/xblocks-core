/* global xblocks, global */
/* jshint strict: false */

/**
 * @returns {object}
 */
xblocks.utils.merge = function() {
    var options;
    var name;
    var src;
    var copy;
    var copyIsArray;
    var clone;
    var target = arguments[0] || {};
    var i = 1;
    var length = arguments.length;
    var deep = false;
    var type = xblocks.utils.type(target);

    if (type === 'boolean') {
        deep = target;
        target = arguments[i] || {};
        i++;
    }

    type = xblocks.utils.type(target);

    if (type !== 'object' && type !== 'function') {
        target = {};
    }

    if (i === length) {
        target = this;
        i--;
    }

    for (; i < length; i++) {
        if ((options = arguments[i]) !== null) {
            // Extend the base object
            for (name in options) {
                src = target[name];
                copy = options[name];

                if (target === copy) {
                    continue;
                }

                if (deep && copy && (xblocks.utils.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && Array.isArray(src) ? src : [];

                    } else {
                        clone = src && xblocks.utils.isPlainObject(src) ? src : {};
                    }

                    target[name] = xblocks.utils.merge( deep, clone, copy );

                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }

    return target;
};
