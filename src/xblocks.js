/*! borschik:include:../node_modules/setimmediate/setImmediate.js */

/*! borschik:include:../node_modules/dom-token-list-polyfill/src/token-list.js */
/*! borschik:include:../node_modules/WeakMap/weakmap.js */
/*! borschik:include:../node_modules/MutationObservers/MutationObserver.js */

/*! borschik:include:../node_modules/CustomElements/src/scope.js */
/*! borschik:include:../node_modules/CustomElements/src/Observer.js */
/*! borschik:include:../node_modules/CustomElements/src/CustomElements.js */
/*! borschik:include:../node_modules/CustomElements/src/Parser.js */
/*! borschik:include:../node_modules/CustomElements/src/boot.js */

/*! borschik:include:../node_modules/HTMLImports/src/scope.js */
/*! borschik:include:../node_modules/HTMLImports/src/Loader.js */
/*! borschik:include:../node_modules/HTMLImports/src/Parser.js */
/*! borschik:include:../node_modules/HTMLImports/src/HTMLImports.js */
/*! borschik:include:../node_modules/HTMLImports/src/Observer.js */
/*! borschik:include:../node_modules/HTMLImports/src/boot.js */

/*! borschik:include:../node_modules/x-tag-core/src/core.js */

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
     */

    /**
     * @namespace xblocks
     */
    var xblocks = {};

    var global = (function() {
        return this || (1, eval)('this');
    }());

    global.xblocks = xblocks;

    /*! borschik:include:xblocks/customevent.js */
    /*! borschik:include:xblocks/utils.js */
    /*! borschik:include:xblocks/dom.js */
    /*! borschik:include:xblocks/view.js */
    /*! borschik:include:xblocks/block.js */
    /*! borschik:include:xblocks/element.js */

}());
