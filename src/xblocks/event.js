import isNative from 'lodash/isNative';
import context from '../context';
import CustomEventCommon from '../polyfills/CustomEventCommon';

/**
 * Designer events.
 *
 * @example
 * import { Custom } from './event';
 * new Custom('custom-event', {
 *     bubbles: true,
 *     cancelable: true,
 *     detail: { data: '123' }
 * })
 *
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
 * mport { dispatch } from './event';
 * dispatch(node, 'custom-event', {
 *     bubbles: true,
 *     cancelable: true,
 *     detail: { data: '123' }
 * })
 *
 * @param {HTMLElement} element node events
 * @param {string} name event name
 * @param {Object} params the event parameters
 */
export function dispatch(element, name, params) {
    element.dispatchEvent(new Custom(name, params || {}));
}
