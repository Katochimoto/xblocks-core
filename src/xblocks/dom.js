/* global xblocks, global */
/* jshint strict: false */

/**
 * @namespace
 */
xblocks.dom = xblocks.dom || {};
xblocks.dom.attrs = xblocks.dom.attrs || {};

/**
 * @type {string[]}
 */
xblocks.dom.attrs.ARRTS_BOOLEAN = [
    'active',
    'autofocus',
    'checked',
    'defer',
    'disabled',
    'ismap',
    'multiple',
    'readonly',
    'required',
    'selected',
    'xb-static'
];

/**
 * @type {object}
 */
xblocks.dom.attrs.XB_ATTRS = {
    STATIC: 'xb-static'
};

xblocks.dom.ELEMENT_PROTO = (global.HTMLElement || global.Element).prototype;

/*! borschik:include:dom/attrs.js */
/*! borschik:include:dom/contentNode.js */
/*! borschik:include:dom/upgrade.js */
/*! borschik:include:dom/upgradeAll.js */
/*! borschik:include:dom/cloneNode.js */
/*! borschik:include:dom/outerHTML.js */
