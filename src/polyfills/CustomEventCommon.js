'use strict';

var context = require('../context');
var CustomEventCommon;
var issetCustomEvent = false;

try {
    issetCustomEvent = Boolean(context.document.createEvent('CustomEvent'));
} catch (e) {
    // do nothing
}

if (issetCustomEvent) {
    CustomEventCommon = function (eventName, params) {
        params = params || {};

        var bubbles = Boolean(params.bubbles);
        var cancelable = Boolean(params.cancelable);
        var evt = context.document.createEvent('CustomEvent');

        evt.initCustomEvent(eventName, bubbles, cancelable, params.detail);

        return evt;
    };

} else {
    CustomEventCommon = function (eventName, params) {
        params = params || {};

        var bubbles = Boolean(params.bubbles);
        var cancelable = Boolean(params.cancelable);
        var evt = context.document.createEvent('Event');

        evt.initEvent(eventName, bubbles, cancelable);
        evt.detail = params.detail;

        return evt;
    };
}

CustomEventCommon.prototype = context.Event.prototype;

module.exports = CustomEventCommon;
