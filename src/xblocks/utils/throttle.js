/* global xblocks */
/* jshint strict: false */

xblocks.utils.throttle = function(callback, threshhold, scope) {
    threshhold = threshhold || 250;
    var last;
    var deferTimer;

    return function() {
        var context = scope || this;
        var now = Date.now();
        var args = arguments;

        if (last && now < last + threshhold) {
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function() {
                last = now;
                callback.apply(context, args);
            }, threshhold);

        } else {
            last = now;
            callback.apply(context, args);
        }
    };
};
