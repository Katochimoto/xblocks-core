/* global xblocks, global */
/* jshint strict: false */

/**
 * @param {*} x
 * @param {*} y
 * @returns {boolean}
 */

xblocks.utils._equal = {
    array: function(x, y) {
        if (x === y) {
            return true;
        }

        var i = 0;
        var l = x.length;

	    if (l !== y.length) {
            return false;
        }

	    for (; i < l; i++) {
		    if (!xblocks.utils.equals(x[i], y[i])) {
                return false;
            }
	    }

	    return true;
    },

    object: function(x, y) {
        if (x === y) {
		    return true;
        }

    	for (var i in x) {
    		if (y.hasOwnProperty(i)) {
    			if (!xblocks.utils.equals(x[i], y[i])) {
                    return false;
                }

    		} else {
    			return false;
    		}
    	}

    	for (var i in y) {
    		if (!x.hasOwnProperty(i)) {
    			return false;
    		}
    	}

    	return true;
    },

    date: function(x, y) {
        return x.getTime() === y.getTime();
    },

    regexp: function(x, y) {
        return x.toString() === y.toString();
    }
};

xblocks.utils.equals = function(x, y) {
    if (x === y) {
        return true;
    }

    var xType = xblocks.utils.type(x);
    var yType = xblocks.utils.type(y);

    if (xType !== yType) {
        return false;
    }

    return xblocks.utils._equal.hasOwnProperty(xType) ?
        xblocks.utils._equal[xType](x, y) :
        x == y;
};
