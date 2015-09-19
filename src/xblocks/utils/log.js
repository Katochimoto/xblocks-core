'use strict';

var context = require('context');

exports.time = function (element, name) {
    if (!element._xtimers) {
        element._xtimers = {};
    }

    if (!Array.isArray(element._xtimers[ name ])) {
        element._xtimers[ name ] = [];
    }

    element._xtimers[ name ].push(context.performance.now());
};

exports.info = function () {
    context.console.info.apply(context.console, arguments);
};
