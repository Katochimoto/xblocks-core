/* global xblocks, global */
/* jshint strict: false */

/**
 * @namespace
 */
xblocks.event = xblocks.event || {};

/**
 * @constructor
 */
xblocks.event.Custom = (function() {
    if (xblocks.utils.pristine('CustomEvent')) {
        return global.CustomEvent;
    }

    var issetCustomEvent = false;
    try {
        issetCustomEvent = Boolean(global.document.createEvent('CustomEvent'));
    } catch(e) {
        // do nothing
    }

    var CustomEvent = function(eventName, params) {
        params = params || {};

        var evt;
        var bubbles = Boolean(params.bubbles);
        var cancelable = Boolean(params.cancelable);

        if (issetCustomEvent) {
            evt = global.document.createEvent('CustomEvent');
            evt.initCustomEvent(eventName, bubbles, cancelable, params.detail);

        } else {
            evt = global.document.createEvent('Event');
            evt.initEvent(eventName, bubbles, cancelable);
            evt.detail = params.detail;
        }

        return evt;
    };

    CustomEvent.prototype = global.Event.prototype;

    return CustomEvent;
}());

/**
 * @param {HTMLElement} element
 * @param {string} name
 * @param {object} params
 */
xblocks.event.dispatch = function(element, name, params) {
    element.dispatchEvent(new xblocks.event.Custom(name, params));
};
