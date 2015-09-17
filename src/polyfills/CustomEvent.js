/**
 * strange commit, checks CustomEvent only in IE
 * https://github.com/webcomponents/webcomponentsjs/commit/8d6a38aa6e3d03ff54a41db9e9725401bbc1446c
 */

'use strict';

var context = require('../context');

if (typeof context.CustomEvent !== 'function') {
    context.CustomEvent = require('./CustomEventCommon');
}
