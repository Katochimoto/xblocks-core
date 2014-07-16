/* global xblocks, global, React */
/* jshint strict: false */

/**
 * @module xblocks.view
 */
xblocks.view = {};

/**
 * @param {object} component
 */
xblocks.view.create = function(component) {
    component = Array.isArray(component) ? component : [component];
    component.unshift(true, {});
    component.push({
        propTypes: {
            '_uid': React.PropTypes.string,
            'children': React.PropTypes.renderable,
            'xb-static': React.PropTypes.bool
        },

        template: function(ref, props) {
            var rootNode = React.__internals.Mount.findReactContainerForID(this._rootNodeID);
            var templates = rootNode && rootNode.xuid && rootNode.templates;

            if (templates && templates.hasOwnProperty(ref)) {
                props = props || {};
                props.dangerouslySetInnerHTML = {
                    __html: templates[ref](this.props)
                };

                return React.DOM.div(props);
            }

            return null;
        }
    });

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

    React.DOM[blockName] = xblocks.view.create(component);
    return React.DOM[blockName];
};

/**
 * @param {string} blockName
 * @returns {*}
 */
xblocks.view.get = function(blockName) {
    return React.DOM[blockName];
};
