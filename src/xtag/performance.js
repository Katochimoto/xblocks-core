(function(global) {
    if (typeof(global.performance) === 'undefined') {
        global.performance = {};
    }

    if (!global.performance.now) {
        var nowOffset;

        if (global.performance.timing && global.performance.timing.navigationStart) {
            nowOffset = global.performance.timing.navigationStar;

        } else {
            nowOffset = Date.now();
        }

        global.performance.now = function() {
            return (Date.now() - nowOffset);
        };
    }

}(window));
