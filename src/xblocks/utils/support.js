/* global xblocks, global */
/* jshint strict: false */

xblocks.utils.support = {};

xblocks.utils.support.template = ('content' in global.document.createElement('template'));

xblocks.utils.support.msie = (function() {
    var ua = global.navigator.userAgent.toLowerCase();
    var match = /(msie) ([\w.]+)/.exec(ua) || [];

    if (match[1]) {
        return match[2] || '0';
    }

    return false;
}());

xblocks.utils.support.upgradeelements = Boolean(
    global.CustomElements &&
    typeof(global.CustomElements.upgradeAll) === 'function'
);
