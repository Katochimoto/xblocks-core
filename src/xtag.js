import context from './context';

context.Platform = {};

/* eslint no-unused-vars:0 */
var logFlags = {
    // dom: true
    // data: true
};

import './polyfills/performance';
import './polyfills/matches';
import './polyfills/CustomEvent';
import './polyfills/DOMAttrModified';

import 'dom-token-list-polyfill/src/token-list.js';
import 'webcomponents.js/src/WeakMap/WeakMap.js';
import 'webcomponents.js/src/MutationObserver/MutationObserver.js';

import 'webcomponents.js/src/CustomElements/base.js';
import 'webcomponents.js/src/CustomElements/traverse.js';
import 'webcomponents.js/src/CustomElements/observe.js';
import 'webcomponents.js/src/CustomElements/upgrade.js';
import 'webcomponents.js/src/CustomElements/register.js';
import 'webcomponents.js/src/CustomElements/boot.js';

import 'webcomponents.js/src/HTMLImports/base.js';
import 'webcomponents.js/src/HTMLImports/module.js';
import 'webcomponents.js/src/HTMLImports/path.js';
import 'webcomponents.js/src/HTMLImports/xhr.js';
import 'webcomponents.js/src/HTMLImports/Loader.js';
import 'webcomponents.js/src/HTMLImports/Observer.js';
import 'webcomponents.js/src/HTMLImports/parser.js';
import 'webcomponents.js/src/HTMLImports/importer.js';
import 'webcomponents.js/src/HTMLImports/dynamic.js';
import 'webcomponents.js/src/HTMLImports/boot.js';

import 'handjs/hand.base.js';
import xtag from 'x-tag/src/core.js';

context.xtag = xtag;

export default xtag;
