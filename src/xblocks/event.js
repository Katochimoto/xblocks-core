/**
 * @module xblocks-core/event
 */

import isNative from 'lodash/isNative';
import context from '../context';
import CustomEventCommon from '../polyfills/CustomEventCommon';

/**
 * Designer events.
 *
 * @example
 * import { Custom } from 'xblocks-core/event';
 *
 * new Custom('custom-event', {
 *     bubbles: true,
 *     cancelable: true,
 *     detail: { data: '123' }
 * })
 *
 * @alias module:xblocks-core/event~Custom
 * @constructor
 */
export let Custom = (function () {
    if (isNative('CustomEvent')) {
        return context.CustomEvent;
    }

    return CustomEventCommon;
}());

/**
 * Dispatch event.
 *
 * @example
 * import { dispatch } from 'xblocks-core/event';
 * dispatch(node, 'custom-event', {
 *     bubbles: true,
 *     cancelable: true,
 *     detail: { data: '123' }
 * })
 *
 * @alias module:xblocks-core/event.dispatch
 * @param {HTMLElement} element node events
 * @param {string} name event name
 * @param {Object} params the event parameters
 * @param {boolean} [params.bubbles=false]
 * @param {boolean} [params.cancelable=false]
 * @param {*} [params.detail]
 */
export function dispatch(element, name, params) {
    element.dispatchEvent(new Custom(name, params || {}));
}

/**
 * Forwarding events
 *
 * @example
 * import { forwardingEvents } from 'xblocks-core/event';
 * forwardingEvents('custom-event', fromNode, toNode, false);
 *
 * @param {string} name event name
 * @param {HTMLElement} fromElement
 * @param {HTMLElement} toElement
 * @param {boolean} [capture=false]
 * @returns {function} callback
 */
export function forwardingEvents(name, fromElement, toElement, capture = false) {
    const callback = function (event) {
        dispatch(toElement, name, {
            bubbles: event.bubbles,
            cancelable: event.cancelable,
            detail: event.detail
        });
    };

    callback.cancel = function () {
        fromElement.removeEventListener(name, callback, capture);
    };

    fromElement.addEventListener(name, callback, capture);

    return callback;
}
