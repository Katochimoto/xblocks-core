import context from '../context';
import isNative from '_/lang/isNative';
import CustomEventCommon from '../polyfills/CustomEventCommon';

/**
 * Designer events
 *
 * @example
 * new xblocks.event.Custom('custom-event', {
 *     bubbles: true,
 *     cancelable: true,
 *     detail: { data: '123' }
 * })
 *
 * @constructor
 * @memberOf xblocks.event
 */
let Custom = (function () {
    if (isNative('CustomEvent')) {
        return context.CustomEvent;
    }

    return CustomEventCommon;
}());

export default {
    Custom,
    dispatch
};

/**
 * Dispatch event
 *
 * @example
 * xblocks.event.dispatch(node, 'custom-event', {
 *     bubbles: true,
 *     cancelable: true,
 *     detail: { data: '123' }
 * })
 *
 * @param {HTMLElement} element node events
 * @param {string} name event name
 * @param {object} params the event parameters
 */
function dispatch(element, name, params) {
    element.dispatchEvent(new Custom(name, params || {}));
}
