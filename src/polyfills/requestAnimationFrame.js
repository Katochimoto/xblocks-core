/* jshint -W067 */
(function(global) {
    'use strict';

    var lastTime = 0;
    var vendors = [ 'ms', 'moz', 'webkit', 'o' ];
    var vendor;

    for (var x = 0; x < 4 && !global.requestAnimationFrame; ++x) {
        vendor = vendors[ x ];
        global.requestAnimationFrame = global[ vendor + 'RequestAnimationFrame' ];
        global.cancelAnimationFrame = global[ vendor + 'CancelAnimationFrame' ] ||
            global[ vendor + 'CancelRequestAnimationFrame' ];
    }

    if (!global.requestAnimationFrame) {
        global.requestAnimationFrame = function(callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = global.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }

    if (!global.cancelAnimationFrame) {
        global.cancelAnimationFrame = function(id) {
            global.clearTimeout(id);
        };
    }

}(function() {
    return this || (1, eval)('this');
}()));
