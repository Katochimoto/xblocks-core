import context from '../context';

if (typeof context.performance === 'undefined') {
    context.performance = {};
}

/**
 * Method Performance.now() returns timestamp DOMHighResTimeStamp,
 * measured in milliseconds, accurate to one thousandth of a millisecond.
 * @returns {number}
 */
context.performance.now = context.performance.now || (function () {
    var nowOffset;

    if (context.performance.timing && context.performance.timing.navigationStart) {
        nowOffset = context.performance.timing.navigationStar;

    } else {
        nowOffset = Date.now();
    }

    return function () {
        return (Date.now() - nowOffset);
    };
}());
