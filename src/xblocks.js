/*! borschik:include:../node_modules/setimmediate/setImmediate.js */

/*jshint -W067 */
(function(global, undefined) {
    'use strict';

    /**
     * MutationObserver provides developers a way to react to changes in a DOM
     * @typedef {Object} MutationObserver
     * @property {Function} disconnect
     * @property {Function} observe
     */

    /**
     * MutationRecord is the object that will be passed to the observer's callback
     * @typedef {Object} MutationRecord
     * @property {String} attributeName
     * @property {String} type
     */


    /**
     * @namespace xtag
     */

    /**
     * @namespace React
     * @property {Function} unmountComponentAtNode
     * @property {Function} renderComponent
     * @property {Function} createClass
     */

    /**
     * @namespace React.DOM
     */

    /**
     * React constructor component
     * @typedef {Function} Constructor
     * @property {Function} unmountComponent
     * @property {Function} replaceProps
     * @property {Function} setProps
     * @property {Function} isMounted
     */

    /**
     * @namespace React
     */
    var React = global.React;

    /**
     * @namespace xtag
     */
    var xtag = global.xtag;

    /**
     * @namespace xblocks
     */
    var xblocks = global.xblocks = {};

    (function() {
        var define = function(ctor) {
            xblocks.tmpl = ctor();
        };

        define.amd = true;

        /*! borschik:include:../node_modules/dot/doT.js */
    }());

    /*! borschik:include:xblocks/utils.js */
    /*! borschik:include:xblocks/dom.js */
    /*! borschik:include:xblocks/view.js */
    /*! borschik:include:xblocks/block.js */
    /*! borschik:include:xblocks/element.js */

}(function() {
    return this || (1, eval)('this');
}()));
