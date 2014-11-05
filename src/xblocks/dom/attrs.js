/* global xblocks, React */
/* jshint strict: false */

/**
 * @param {HTMLElement} element
 * @param {object} attrs
 * @return {object}
 */
xblocks.dom.attrs.get = function(element, attrs) {
    if (element.nodeType !== 1 || !element.hasAttributes()) {
        return attrs;
    }

    for (var attrName in attrs) {
        if (attrs.hasOwnProperty(attrName) && element.hasAttribute(attrName)) {
            if (typeof(attrs[ attrName ]) === 'boolean') {
                attrs[ attrName ] = xblocks.dom.attrs.valueConversion(
                    attrName,
                    element.getAttribute(attrName),
                    React.PropTypes.bool
                );

            } else {
                attrs[ attrName ] = element.getAttribute(attrName);
            }
        }
    }

    return attrs;
};

/**
 * @param {HTMLElement} element
 * @return {object}
 */
xblocks.dom.attrs.toObject = function(element) {
    var attrs = {};

    if (element.nodeType === 1 && element.hasAttributes()) {
        Array.prototype.forEach.call(element.attributes, xblocks.dom.attrs._toObjectIterator, attrs);
    }

    return attrs;
};

/**
 * @param {Attr} attr
 * @private
 */
xblocks.dom.attrs._toObjectIterator = function(attr) {
    this[ attr.nodeName ] = attr.value;
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
            return Boolean(value === true || value === '' || prop === value || value === 'true');

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
    propTypes = propTypes || {};
    var prop;

    for (prop in props) {
        if (props.hasOwnProperty(prop)) {
            props[ prop ] = xblocks.dom.attrs.valueConversion(
                prop,
                props[ prop ],
                propTypes[ prop ]
            );
        }
    }

    return props;
};
