/**
 * @namespace
 */
xblocks.dom.attrs = {};

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
    'selected',
    'xb-static'
];

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
 * Выделение атрибутов элемента в плоском представлении
 * @param {HTMLElement} element
 * @return {object}
 */
xblocks.dom.attrs.toObject = function(element) {
    if (element.nodeType !== 1) {
        return {};
    }

    var attrs = {};

    Array.prototype.forEach.call(element.attributes, function(attr) {
        attrs[attr.nodeName] = xblocks.dom.attrs.getRealValue(attr.nodeName, attr.value);
    });

    return attrs;
};
