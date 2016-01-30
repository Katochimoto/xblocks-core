import context from '../context';

var issetCustomEvent = false;

try {
    issetCustomEvent = Boolean(context.document.createEvent('CustomEvent'));
} catch (e) {
    // do nothing
}

var CustomEventCommon = (function () {
    if (issetCustomEvent) {
        return function (eventName, params) {
            params = params || {};

            var bubbles = Boolean(params.bubbles);
            var cancelable = Boolean(params.cancelable);
            var evt = context.document.createEvent('CustomEvent');

            evt.initCustomEvent(eventName, bubbles, cancelable, params.detail);

            return evt;
        };
    }

    return function (eventName, params) {
        params = params || {};

        var bubbles = Boolean(params.bubbles);
        var cancelable = Boolean(params.cancelable);
        var evt = context.document.createEvent('Event');

        evt.initEvent(eventName, bubbles, cancelable);
        evt.detail = params.detail;

        return evt;
    };
}());

CustomEventCommon.prototype = context.Event.prototype;

export default CustomEventCommon;
