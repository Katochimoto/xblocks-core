/* global xblocks, global */
/* jshint strict: false */

xblocks.utils.event = {};

/**
 * @constructor
 */
xblocks.utils.CustomEvent = (function() {
    if (!xblocks.utils.pristine('CustomEvent')) {
        var CustomEvent = function(event, params) {
            params = params || {};
            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, Boolean(params.bubbles), Boolean(params.cancelable), params.detail);
            return evt;
        };

        CustomEvent.prototype = global.Event.prototype;

        return CustomEvent;

    } else {
        return global.CustomEvent;
    }
}());

/**
 * @param {HTMLElement} element
 * @param {string} name
 * @param {object} params
 */
xblocks.utils.dispatchEvent = function(element, name, params) {
    element.dispatchEvent(new xblocks.utils.CustomEvent(name, params));
};

/**
 * @param {HTMLElement} element
 * @param {Event} event mouseover or mouseout event
 * @param {function} callback
 */
xblocks.utils.event.mouseEnterFilter = function(element, event, callback) {
    var toElement = event.relatedTarget || event.srcElement;;

    while (toElement && toElement !== element) {
        toElement = toElement.parentNode;
    }

    if (toElement === element) {
        return;
    }

    return callback.call(element, event);
};

xblocks.utils.event.mouseLeaveFilter = xblocks.utils.event.mouseEnterFilter;
