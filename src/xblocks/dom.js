/* global xblocks */
/* jshint strict: false */

/**
 * @namespace
 */
xblocks.dom = {
    attrs: {
        /**
         * @type {string[]}
         */
        ARRTS_BOOLEAN: [
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
        ],

        /**
         * @type {object}
         */
        XB_ATTRS: {
            STATIC: 'xb-static'
        }
    }
};

/*! borschik:include:dom/attrs.js */
/*! borschik:include:dom/index.js */
/*! borschik:include:dom/isParent.js */
/*! borschik:include:dom/matchesSelector.js */
