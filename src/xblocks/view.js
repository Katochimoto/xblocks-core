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
    /*
    if (!Array.isArray(component.mixins)) {
        component.mixins = [];
    }

    component.mixins.push({});
    */

    if (!xblocks.utils.isPlainObject(component.propTypes)) {
        component.propTypes = {};
    }

    component.propTypes._uid = React.PropTypes.string;

    return React.createClass(component);
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
