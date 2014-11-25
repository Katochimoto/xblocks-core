/* jshint -W067 */
/* jshint unused: false */
(function(global, undefined) {
    'use strict';

    /**
     * @namespace React
     */
    var React = global.React;
    var ReactMount = (React.__internals && React.__internals.Mount) ||
        (global.__REACT_DEVTOOLS_GLOBAL_HOOK__ && global.__REACT_DEVTOOLS_GLOBAL_HOOK__._reactRuntime.Mount);

    /**
     * @namespace xblocks
     */
    var xblocks = global.xblocks = {};

    /*! borschik:include:xblocks/utils.js */
    /*! borschik:include:xblocks/dom.js */
    /*! borschik:include:xblocks/event.js */
    /*! borschik:include:xblocks/react.js */
    /*! borschik:include:xblocks/tag.js */
    /*! borschik:include:xblocks/view.js */
    /*! borschik:include:xblocks/block.js */
    /*! borschik:include:xblocks/element.js */

}(function() {
    return this || (1, eval)('this');
}()));
