'use strict';

var context = require('../context');

if (typeof(context.performance) === 'undefined') {
    context.performance = {};
}

if (!context.performance.now) {
    var nowOffset;

    if (context.performance.timing && context.performance.timing.navigationStart) {
        nowOffset = context.performance.timing.navigationStar;

    } else {
        nowOffset = Date.now();
    }

    context.performance.now = function() {
        return (Date.now() - nowOffset);
    };
}
