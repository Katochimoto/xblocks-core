/* global xblocks, React */
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

/**
 * @param {HTMLElement} element
 * @return {object}
 */
xblocks.dom.attrs.toObject = function(element) {
    var attrs = {};

    if (element.nodeType === 1) {
        Array.prototype.forEach.call(element.attributes, function(attr) {
            attrs[attr.nodeName] = attr.value;
        });
    }

    return attrs;
};

/**
 * @param {string} prop
 * @param {*} value
 * @param {function} [type]
 * @returns {*}
 */
xblocks.dom.attrs.valueConversion = function(prop, value, type) {
    if (!type) {
        if (value === 'true' || value === 'false' || xblocks.dom.attrs.ARRTS_BOOLEAN.indexOf(prop) !== -1) {
            type = React.PropTypes.bool;
        }
    }

    switch (type) {
        case React.PropTypes.bool:
            return (value === true || value === '' || prop === value || value === 'true');
        case React.PropTypes.string:
            return String(value);
        case React.PropTypes.number:
            return Number(value);
        default:
            return value;
    }
};

/**
 * @param {object} props
 * @param {object} [propTypes]
 * @returns {object}
 */
xblocks.dom.attrs.typeConversion = function(props, propTypes) {
    propTypes = typeof(propTypes) === 'object' ? propTypes : {};

    for (var prop in props) {
        if (props.hasOwnProperty(prop)) {
            props[prop] = xblocks.dom.attrs.valueConversion(prop, props[prop], propTypes[prop]);
        }
    }

    return props;
};
