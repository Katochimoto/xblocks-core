/* jshint unused: false */

window.Platform = {};
var logFlags = {
    //dom: true,
    //data: true
};

/*! borschik:include:../node_modules/dom-token-list-polyfill/src/token-list.js */
/*! borschik:include:../node_modules/WeakMap/weakmap.js */
/*! borschik:include:../node_modules/MutationObservers/MutationObserver.js */

window.Platform.endOfMicrotask = (function(scope) {
    var iterations = 0;
    var callbacks = [];
    var twiddle = document.createTextNode('');
    var Mutation = window.MutationObserver || window.JsMutationObserver;

    (new Mutation(function() {
        while (callbacks.length) {
            callbacks.shift()();
        }

    })).observe(twiddle, {
        characterData: true
    });

    return function(callback) {
        twiddle.textContent = iterations++;
        callbacks.push(callback);
    };
})();

(function() {
    /*! borschik:include:../node_modules/CustomElements/src/scope.js */
    /*! borschik:include:../node_modules/CustomElements/src/Observer.js */
    /*! borschik:include:../node_modules/CustomElements/src/CustomElements.js */
    /*! borschik:include:../node_modules/CustomElements/src/Parser.js */
    /*! borschik:include:../node_modules/CustomElements/src/boot.js */
}());

/*
(function() {
    include:../node_modules/HTMLImports/src/scope.js
    include:../node_modules/HTMLImports/src/Loader.js
    include:../node_modules/HTMLImports/src/Parser.js
    include:../node_modules/HTMLImports/src/HTMLImports.js
    include:../node_modules/HTMLImports/src/Observer.js
    include:../node_modules/HTMLImports/src/boot.js
}());
*/

/*! borschik:include:../node_modules/x-tag-core/src/core.js */
