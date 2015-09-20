'use strict';

var isPlainObject = require('./isPlainObject');

module.exports = mergeBase;

function mergeBase(checkСopy, args) {
    var options;
    var name;
    var src;
    var copy;
    var copyIsArray;
    var clone;
    var target = args[0] || {};
    var i = 1;
    var length = args.length;
    var deep = false;

    // Handle a deep copy situation
    if (typeof target === 'boolean') {
        deep = target;

        // Skip the boolean and the target
        target = args[ i ] || {};
        i++;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== 'object' && typeof target !== 'function') {
        target = {};
    }

    // Extend jQuery itself if only one argument is passed
    if (i === length) {
        target = this;
        i--;
    }

    for (; i < length; i++) {
        // Only deal with non-null/undefined values
        /* eslint eqeqeq:0 */
        if ((options = args[ i ]) != null) {
            // Extend the base object
            for (name in options) {
                src = target[ name ];
                copy = options[ name ];

                // Prevent never-ending loop
                if (target === copy) {
                    continue;
                }

                // Recurse if we're merging plain objects or arrays
                if (deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {

                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && Array.isArray(src) ? src : [];

                    } else {
                        clone = src && isPlainObject(src) ? src : {};
                    }

                    // Never move original objects, clone them
                    target[ name ] = mergeBase(checkСopy, [ deep, clone, copy ]);

                } else if (checkСopy(copy)) {
                    target[ name ] = copy;
                }
            }
        }
    }

    // Return the modified object
    return target;
}
