'use strict';

var context = require('../../context');

/**
 * @function xblocks.dom.upgrade
 */
module.exports = (function () {
    if (context.CustomElements && typeof context.CustomElements.upgrade === 'function') {
        return context.CustomElements.upgrade;

    } else {
        return function () {};
    }
}());
