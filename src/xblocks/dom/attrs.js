/**
 * @module xblocks/dom/attrs
 */

import { PropTypes } from 'react';

/**
 * A set of boolean attributes.
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
 * To obtain the specified attributes.
 *
 * @example
 * import { get } from 'xblocks/dom/attrs';
 *
 * var node = document.createElement('div');
 * node.setAttribute('attr1', '');
 * node.setAttribute('attr2', 'test1');
 * node.setAttribute('attr3', 'test2');
 *
 * get(node, {
 *     'attr1': false,
 *     'attr2': undefined
 * });
 * // { 'attr1': true, 'attr2': 'test1' }
 *
 * @alias module:xblocks/dom/attrs.get
 * @param {HTMLElement} element
 * @param {Object} attrs the set of derived attributes (+default values)
 * @returns {Object}
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
 * Retrieve object attributes.
 *
 * @example
 * import { toObject } from 'xblocks/dom/attrs';
 *
 * var node = document.createElement('div');
 * node.setAttribute('attr1', '');
 * node.setAttribute('attr2', 'test');
 *
 * toObject(node);
 * // { 'attr1': '', 'attr2': 'test' }
 *
 * @alias module:xblocks/dom/attrs.toObject
 * @param {HTMLElement} element
 * @returns {Object}
 */
export function toObject(element) {
    const attrs = {};

    if (element.nodeType === 1 && element.hasAttributes()) {
        Array.prototype.forEach.call(element.attributes, toObjectIterator, attrs);
    }

    return attrs;
}

/**
 * Collective conversion of attribute types.
 *
 * @example
 * import { typeConversion } from 'xblocks/dom/attrs';
 *
 * typeConversion({
 *     'attr1': '123',
 *     'attr2': ''
 * }, {
 *     'attr1': PropTypes.number,
 *     'attr2': PropTypes.bool
 * });
 * // { 'attr1': 123, 'attr2': true }
 *
 * @alias module:xblocks/dom/attrs.typeConversion
 * @param {Object} props the set of attributes
 * @param {Object} [propTypes] the set of attribute types
 * @returns {Object}
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
 * Convert the attribute value to the specified type.
 *
 * @example
 * import { valueConversion } from 'xblocks/dom/attrs';
 *
 * valueConversion('attr1', 'true');
 * // true
 * valueConversion('attr1', 'true', PropTypes.string);
 * // 'true'
 * valueConversion('attr1', '123', PropTypes.number);
 * // 123
 *
 * @alias module:xblocks/dom/attrs.valueConversion
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
 * @this Object
 * @private
 */
function toObjectIterator(attr) {
    this[ attr.nodeName ] = attr.value;
}
