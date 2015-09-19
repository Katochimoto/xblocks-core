'use strict';

var context = require('context');
var pristine = require('utils/pristine');
var CustomEventCommon = require('polyfills/CustomEventCommon');
var Custom = (function () {
    if (pristine('CustomEvent')) {
        return context.CustomEvent;
    }

    return CustomEventCommon;
}());

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
exports.Custom = Custom;

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
exports.dispatch = function (element, name, params) {
    element.dispatchEvent(new Custom(name, params || {}));
};
