/* global xblocks, global */
(function(global, xblocks, undefined) {
    'use strict';

    if (!global.CustomEvent) {
        var CustomEvent = function(event, params) {
            params = xblocks.utils.merge({
                bubbles: false,
                cancelable: false,
                detail: undefined

            }, params || {});

            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        };

        CustomEvent.prototype = global.Event.prototype;

        global.CustomEvent = CustomEvent;
    }

}(global, xblocks));
