(function(xblocks, React) {

    var XBView = {};

    /**
     * @module xblocks.view
     */
    xblocks.view = {};

    /**
     * @param {string} blockName
     * @param {object} component
     */
    xblocks.view.register = function(blockName, component) {
        component.mixins = Array.isArray(component.mixins) ? component.mixins: [];
        component.mixins.push(XBView);

        return (React.DOM[blockName] = React.createClass(component));
    };

    xblocks.view.get = function(blockName) {
        return React.DOM[blockName];
    };

}(xblocks, React));
