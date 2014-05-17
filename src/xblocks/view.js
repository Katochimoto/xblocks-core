(function(xblocks, React) {

    var XBView = {};

    /**
     * @module xblocks.view
     */
    xblocks.view = {};

    /**
     * @param {object} component
     */
    xblocks.view.create = function(component) {
        component.mixins = Array.isArray(component.mixins) ? component.mixins: [];
        component.mixins.push(XBView);

        return React.createClass(component);
    };

    /**
     * @param {string} blockName
     * @param {object} component
     */
    xblocks.view.register = function(blockName, component) {
        return (React.DOM[blockName] = xblocks.view.create(component));
    };

    xblocks.view.get = function(blockName) {
        return React.DOM[blockName];
    };

}(xblocks, React));
