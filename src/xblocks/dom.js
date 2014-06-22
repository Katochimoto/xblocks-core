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
            'STATIC': 'xb-static'
        }
    }
};

/**
 * @param {string} name
 * @param {string} value
 * @returns {string|boolean}
 */
xblocks.dom.attrs.getRealValue = function(name, value) {
    if (value === 'true' ||
        value === 'false' ||
        xblocks.dom.attrs.ARRTS_BOOLEAN.indexOf(name) !== -1
        ) {

        return (value === '' || name === value || value === 'true');
    }

    return value;
};

/**
 * @param {HTMLElement} element
 * @return {object}
 */
xblocks.dom.attrs.toObject = function(element) {
    var attrs = {};

    if (element.nodeType === 1) {
        Array.prototype.forEach.call(element.attributes, function(attr) {
            attrs[attr.nodeName] = xblocks.dom.attrs.getRealValue(attr.nodeName, attr.value);
        });
    }

    return attrs;
};
