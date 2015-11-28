import { PropTypes } from 'react';

/**
 * A set of boolean attributes
 * @type {string[]}
 */
const attrsBoolean = [
    'active',
    'autofocus',
    'checked',
    'defer',
    'disabled',
    'ismap',
    'multiple',
    'readonly',
    'required',
    'selected'
];

export default {
    get,
    toObject,
    typeConversion,
    valueConversion
};

/**
 * To obtain the specified attributes
 *
 * @example
 * node = document.createElement('div');
 * node.setAttribute('attr1', '');
 * node.setAttribute('attr2', 'test1');
 * node.setAttribute('attr3', 'test2');
 * xblocks.dom.attrs.get(node, {
 *     'attr1': false,
 *     'attr2': undefined
 * });
 * // { 'attr1': true, 'attr2': 'test1' }
 *
 * @function xblocks.dom.attrs.get
 * @param {HTMLElement} element
 * @param {object} attrs the set of derived attributes (+default values)
 * @return {object}
 */
function get(element, attrs) {
    if (element.nodeType !== 1 || !element.hasAttributes()) {
        return attrs;
    }

    var attrName;
    for (attrName in attrs) {
        if (attrs.hasOwnProperty(attrName) && element.hasAttribute(attrName)) {
            if (typeof attrs[ attrName ] === 'boolean') {
                attrs[ attrName ] = valueConversion(
                    attrName,
                    element.getAttribute(attrName),
                    PropTypes.bool
                );

            } else {
                attrs[ attrName ] = element.getAttribute(attrName);
            }
        }
    }

    return attrs;
}

/**
 * Retrieve object attributes
 *
 * @example
 * node = document.createElement('div');
 * node.setAttribute('attr1', '');
 * node.setAttribute('attr2', 'test');
 * xblocks.dom.attrs.toObject(node);
 * // { 'attr1': '', 'attr2': 'test' }
 *
 * @function xblocks.dom.attrs.toObject
 * @param {HTMLElement} element
 * @return {object}
 */
function toObject(element) {
    var attrs = {};

    if (element.nodeType === 1 && element.hasAttributes()) {
        Array.prototype.forEach.call(element.attributes, toObjectIterator, attrs);
    }

    return attrs;
}

/**
 * Collective conversion of attribute types
 *
 * @example
 * xblocks.dom.attrs.typeConversion({
 *     'attr1': '123',
 *     'attr2': ''
 * }, {
 *     'attr1': PropTypes.number,
 *     'attr2': PropTypes.bool
 * });
 * // { 'attr1': 123, 'attr2': true }
 *
 * @function xblocks.dom.attrs.typeConversion
 * @param {object} props the set of attributes
 * @param {object} [propTypes] the set of attribute types
 * @returns {object}
 */
function typeConversion(props, propTypes) {
    propTypes = propTypes || {};

    var prop;
    for (prop in props) {
        if (props.hasOwnProperty(prop)) {
            props[ prop ] = valueConversion(
                prop,
                props[ prop ],
                propTypes[ prop ]
            );
        }
    }

    return props;
}

/**
 * Convert the attribute value to the specified type
 *
 * @example
 * xblocks.dom.attrs.valueConversion('attr1', 'true');
 * // true
 * xblocks.dom.attrs.valueConversion('attr1', 'true', PropTypes.string);
 * // 'true'
 * xblocks.dom.attrs.valueConversion('attr1', '123', PropTypes.number);
 * // 123
 *
 * @function xblocks.dom.attrs.valueConversion
 * @param {string} prop attribute name
 * @param {*} value attribute value
 * @param {function} [type] attribute type
 * @returns {*}
 */
function valueConversion(prop, value, type) {
    if (!type) {
        if (value === 'true' || value === 'false' || attrsBoolean.indexOf(prop) !== -1) {
            type = PropTypes.bool;
        }
    }

    switch (type) {
    case PropTypes.bool:
        return Boolean(value === true || value === '' || prop === value || value === 'true');

    case PropTypes.string:
        return String(value);

    case PropTypes.number:
        return Number(value);

    default:
        return value;
    }
}

/**
 * @param {Attr} attr
 * @private
 */
function toObjectIterator(attr) {
    this[ attr.nodeName ] = attr.value;
}
