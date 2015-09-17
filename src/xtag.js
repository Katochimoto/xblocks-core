var context = require('./context');

context.Platform = {};

/* eslint no-unused-vars:0 */
var logFlags = {
    // dom: true
    // data: true
};

require('./polyfills/performance');
require('./polyfills/matches');
require('./polyfills/CustomEvent');
require('./polyfills/DOMAttrModified');

require('dom-token-list-polyfill/src/token-list.js');
require('webcomponents.js/src/WeakMap/WeakMap.js');
require('webcomponents.js/src/MutationObserver/MutationObserver.js');

(function () {
    require('webcomponents.js/src/CustomElements/base.js');
    require('webcomponents.js/src/CustomElements/traverse.js');
    require('webcomponents.js/src/CustomElements/observe.js');
    require('webcomponents.js/src/CustomElements/upgrade.js');
    require('webcomponents.js/src/CustomElements/register.js');
    require('webcomponents.js/src/CustomElements/boot.js');
}());

(function () {
    require('webcomponents.js/src/HTMLImports/base.js');
    require('webcomponents.js/src/HTMLImports/module.js');
    require('webcomponents.js/src/HTMLImports/path.js');
    require('webcomponents.js/src/HTMLImports/xhr.js');
    require('webcomponents.js/src/HTMLImports/Loader.js');
    require('webcomponents.js/src/HTMLImports/Observer.js');
    require('webcomponents.js/src/HTMLImports/parser.js');
    require('webcomponents.js/src/HTMLImports/importer.js');
    require('webcomponents.js/src/HTMLImports/dynamic.js');
    require('webcomponents.js/src/HTMLImports/boot.js');
}());

require('handjs/hand.base.js');
require('x-tag-core/src/core.js');
