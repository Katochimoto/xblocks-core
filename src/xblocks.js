/*jshint -W067 */
(function() {
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
     *
     */



    /**
     * @namespace xblocks
     */
    var xblocks = {};

    var namespace;

    if (typeof module !== 'undefined') {
        namespace = module.exports = xblocks;

    } else {
        namespace = (function() {
            return this || (1, eval)('this');
        }());
    }

    namespace.xblocks = xblocks;

    /*! borschik:include:xblocks/utils.js */
    /*! borschik:include:xblocks/dom.js */
    /*! borschik:include:xblocks/view.js */
    /*! borschik:include:xblocks/block.js */
    /*! borschik:include:xblocks/element.js */

}());
