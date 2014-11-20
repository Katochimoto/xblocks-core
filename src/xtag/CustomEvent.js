/**
 * strange commit, checks CustomEvent only in IE
 * https://github.com/webcomponents/webcomponentsjs/commit/8d6a38aa6e3d03ff54a41db9e9725401bbc1446c
 */
(function(global) {
    if (typeof(global.CustomEvent) === 'function') {
        return;
    }

    global.CustomEvent = function(event, params) {
        params = params || {};
        var evt = global.document.createEvent('CustomEvent');
        evt.initCustomEvent(event, Boolean(params.bubbles), Boolean(params.cancelable), params.detail);
        return evt;
    };

    global.CustomEvent.prototype = global.Event.prototype;

}(window));
