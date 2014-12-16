/**
 * strange commit, checks CustomEvent only in IE
 * https://github.com/webcomponents/webcomponentsjs/commit/8d6a38aa6e3d03ff54a41db9e9725401bbc1446c
 */
(function(global) {
    if (typeof(global.CustomEvent) === 'function') {
        return;
    }

    var issetCustomEvent = false;
    try {
        issetCustomEvent = Boolean(global.document.createEvent('CustomEvent'));
    } catch(e) {
        // do nothing
    }

    global.CustomEvent = function(eventName, params) {
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

    global.CustomEvent.prototype = global.Event.prototype;

}(window));
