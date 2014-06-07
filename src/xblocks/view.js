/* global xblocks, global */
(function(global, xblocks) {
    'use strict';

    var XBView = {};

    /**
     * @module xblocks.view
     */
    xblocks.view = {};

    /**
     * @param {object} component
     */
    xblocks.view.create = function(component) {
        if (!Array.isArray(component.mixins)) {
            component.mixins = [];
        }

        component.mixins.push(XBView);

        if (!xblocks.utils.isPlainObject(component.propTypes)) {
            component.propTypes = {};
        }

        component.propTypes._uid = global.React.PropTypes.string;

        return global.React.createClass(component);
    };

    /**
     * @param {string} blockName
     * @param {object} component
     * @throws
     */
    xblocks.view.register = function(blockName, component) {
        if (global.React.DOM.hasOwnProperty(blockName)) {
            throw 'Specified item "' + blockName + '" is already defined';
        }

        global.React.DOM[blockName] = xblocks.view.create(component);
        return global.React.DOM[blockName];
    };

    /**
     * @param {string} blockName
     * @returns {*}
     */
    xblocks.view.get = function(blockName) {
        return global.React.DOM[blockName];
    };

}(global, xblocks));
