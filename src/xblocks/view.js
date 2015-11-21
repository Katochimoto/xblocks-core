var React = require('react');
var merge = require('_/object/merge');
var isArray = require('_/lang/isArray');
var viewComponentsClass = {};
var viewCommon = {

    /**
     * Required attributes
     * @memberOf ReactElement.prototype
     * @type {object}
     */
    propTypes: {
        '_uid':         React.PropTypes.node,
        '_container':   React.PropTypes.any,  // Bad way ;(
        'children':     React.PropTypes.node
    },

    /**
     * Create node by template
     * @memberOf ReactElement.prototype
     * @param {string} ref template name
     * @param {object} [props] the attributes of a node
     * @returns {?ReactElement}
     */
    template: function (ref, props) {
        var xtmpl = this.props._container && this.props._container.xtmpl;

        if (typeof xtmpl === 'object' && xtmpl !== null && xtmpl.hasOwnProperty(ref)) {
            return (
                <div {...props} dangerouslySetInnerHTML={{ '__html': this.templatePrepare(xtmpl[ ref ]) }} />
            );
        }

        return null;
    },

    /**
     * Get the node associated with the view
     * @returns {HTMLElement}
     */
    container: function () {
        return this.props._container;
    }
};

var viewCommonUser = {
    templatePrepare: function (tmplString) {
        return tmplString;
    }
};

/**
 * Create class view node
 *
 * @example
 * var view = require('./view');
 *
 * var XBButtonContent = view.create({
 *     'displayName': 'XBButtonContent',
 *     'render': function () {
 *         return (
 *             &lt;span {...this.props}&gt;{this.props.children}&lt;/span&gt;
 *         );
 *     }
 * });
 *
 * view.register('xb-button', {
 *     'displayName': 'xb-button',
 *     'render': function () {
 *         return (
 *             &lt;button&gt;
 *                 &lt;XBButtonContent {...this.props} /&gt;
 *             &lt;/button&gt;
 *         );
 *     }
 * });
 *
 * @see http://facebook.github.io/react/docs/component-specs.html
 * @param {object|array} component settings view creation
 * @returns {function}
 */
exports.create = createClass;

/**
 * Registration of a new node
 *
 * @example
 * var view = require('./view');
 * view.register('xb-button', {
 *     'displayName': 'xb-button',
 *     'render': function () {
 *         return (
 *             &lt;button {...this.props}&gt;{this.props.children}&lt;/button&gt;
 *         );
 *     }
 * });
 *
 * @see http://facebook.github.io/react/docs/component-specs.html
 * @param {string} blockName the name of the new node
 * @param {object|array} component settings view creation
 * @returns {function}
 */
exports.register = function (blockName, component) {
    if (React.DOM.hasOwnProperty(blockName)) {
        /* eslint no-throw-literal:0 */
        throw 'Specified item "' + blockName + '" is already defined';
    }

    var componentClass = createClass(component);
    viewComponentsClass[ blockName ] = componentClass;

    React.DOM[ blockName ] = React.createFactory(componentClass);

    return componentClass;
};

/**
 * Get factory view node
 * @param {string} blockName the name of the new node
 * @returns {function}
 */
exports.getFactory = function (blockName) {
    return React.DOM[ blockName ];
};

/**
 * Get class view node
 * @param {string} blockName the name of the new node
 * @returns {function}
 */
exports.getClass = function (blockName) {
    return viewComponentsClass[ blockName ];
};

function createClass(component) {
    component = isArray(component) ? component : [ component ];
    component.unshift({}, viewCommonUser);
    component.push(viewCommon);

    return React.createClass(merge.apply({}, component));
}
