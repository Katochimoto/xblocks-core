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

/**
 * To obtain the specified attributes
 *
 * @example
 * node = document.createElement('div');
 * node.setAttribute('attr1', '');
 * node.setAttribute('attr2', 'test1');
 * node.setAttribute('attr3', 'test2');
 * get(node, {
 *     'attr1': false,
 *     'attr2': undefined
 * });
 * // { 'attr1': true, 'attr2': 'test1' }
 *
 * @param {HTMLElement} element
 * @param {object} attrs the set of derived attributes (+default values)
 * @return {object}
 */
export function get(element, attrs) {
    if (element.nodeType !== 1 || !element.hasAttributes()) {
        return attrs;
    }

    for (let attrName in attrs) {
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
 * toObject(node);
 * // { 'attr1': '', 'attr2': 'test' }
 *
 * @param {HTMLElement} element
 * @return {object}
 */
export function toObject(element) {
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
 * typeConversion({
 *     'attr1': '123',
 *     'attr2': ''
 * }, {
 *     'attr1': PropTypes.number,
 *     'attr2': PropTypes.bool
 * });
 * // { 'attr1': 123, 'attr2': true }
 *
 * @param {object} props the set of attributes
 * @param {object} [propTypes] the set of attribute types
 * @returns {object}
 */
export function typeConversion(props, propTypes) {
    propTypes = propTypes || {};

    for (let prop in props) {
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
 * valueConversion('attr1', 'true');
 * // true
 * valueConversion('attr1', 'true', PropTypes.string);
 * // 'true'
 * valueConversion('attr1', '123', PropTypes.number);
 * // 123
 *
 * @param {string} prop attribute name
 * @param {*} value attribute value
 * @param {function} [type] attribute type
 * @returns {*}
 */
export function valueConversion(prop, value, type) {
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
