import context from '../context';

let issetCustomEvent = false;

try {
    issetCustomEvent = Boolean(context.document.createEvent('CustomEvent'));
} catch (e) {
    // do nothing
}

let CustomEventCommon = (function () {
    if (issetCustomEvent) {
        return function (eventName, params) {
            params = params || {};

            let bubbles = Boolean(params.bubbles);
            let cancelable = Boolean(params.cancelable);
            let evt = context.document.createEvent('CustomEvent');

            evt.initCustomEvent(eventName, bubbles, cancelable, params.detail);

            return evt;
        };
    }

    return function (eventName, params) {
        params = params || {};

        let bubbles = Boolean(params.bubbles);
        let cancelable = Boolean(params.cancelable);
        let evt = context.document.createEvent('Event');

        evt.initEvent(eventName, bubbles, cancelable);
        evt.detail = params.detail;

        return evt;
    };
}());

CustomEventCommon.prototype = context.Event.prototype;

export default CustomEventCommon;
