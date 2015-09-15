'use strict';

var context = require('../../context');

/**
 * @function xblocks.dom.upgradeAll
 */
module.exports = (function() {
    if (context.CustomElements && typeof(context.CustomElements.upgradeAll) === 'function') {
        return context.CustomElements.upgradeAll;

    } else {
        return function() {};
    }
}());
