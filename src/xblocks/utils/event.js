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
    var toElement = event.relatedTarget || event.srcElement;

    while (toElement && toElement !== element) {
        toElement = toElement.parentNode;
    }

    if (toElement === element) {
        return;
    }

    return callback.call(element, event);
};

xblocks.utils.event.mouseLeaveFilter = xblocks.utils.event.mouseEnterFilter;

xblocks.utils.event.delegate = function(selector, callback) {

    return function(event) {
        var target = event.target || event.srcElement;
        var match;

        if (!target.tagName) {
            return;
        }

        if (xblocks.dom.matchesSelector(target, selector)) {
            match = target;

        } else if (xblocks.dom.matchesSelector(target, selector + ' *')) {
            var parent = target.parentNode;

            while (parent) {
                if (xblocks.dom.matchesSelector(parent, selector)) {
                    match = parent;
                    break;
                }

                parent = parent.parentNode;
            }
        }

        if (!match) {
            return;
        }

        event.delegateElement = match;
        callback.call(match, event);
    };
};

xblocks.utils.event._clickWhich = {
    1: 'left',
    2: 'center',
    3: 'right'
};

xblocks.utils.event.click = function(which, callback) {
    which = Array.isArray(which) ? which : [ which ];

    return function(event) {
        if (event.type !== 'click') {
            return;
        }

        var whichEvt = event.which;

        if (!whichEvt && event.button) {
            /* jshint -W016 */
            if (event.button & 1) {
                whichEvt = 1;
            } else if (event.button & 4) {
                whichEvt = 2;
            } else if (event.button & 2) {
                whichEvt = 3;
            }
        }

        whichEvt = xblocks.utils.event._clickWhich[ whichEvt ];

        if (which.indexOf(whichEvt) !== -1) {
            callback.call(this, event);
        }
    };
};
