/* global xblocks, React */
/* jshint strict: false */

/**
 * @module xblocks.view
 */
xblocks.view = {};

var _viewCommon = {
    propTypes: {
        '_uid': React.PropTypes.node || React.PropTypes.renderable,
        'children': React.PropTypes.node || React.PropTypes.renderable,
        'xb-static': React.PropTypes.bool
    },

    template: function(ref, props) {
        var rootNode = xblocks.react.findContainerForID(this._rootNodeID);
        var xtmpl = rootNode && rootNode.xtmpl;

        if (typeof(xtmpl) === 'object' && xtmpl.hasOwnProperty(ref)) {
            props = props || {};
            props.dangerouslySetInnerHTML = {
                '__html': this._templatePrepare(xtmpl[ref])
            };

            return React.DOM.div(props);
        }

        return null;
    }
};

var _viewCommonUser = {
    _templatePrepare: function(tmplString) {
        return tmplString;
    }
};

/**
 * @param {object} component
 */
xblocks.view.create = function(component) {
    component = Array.isArray(component) ? component : [ component ];
    component.unshift(true, {}, _viewCommonUser);
    component.push(_viewCommon);

    return React.createClass(xblocks.utils.merge.apply({}, component));
};

/**
 * @param {string} blockName
 * @param {object} component
 * @throws
 */
xblocks.view.register = function(blockName, component) {
    if (React.DOM.hasOwnProperty(blockName)) {
        throw 'Specified item "' + blockName + '" is already defined';
    }

    React.DOM[ blockName ] = xblocks.view.create(component);
    return React.DOM[ blockName ];
};

/**
 * @param {string} blockName
 * @returns {*}
 */
xblocks.view.get = function(blockName) {
    return React.DOM[ blockName ];
};
