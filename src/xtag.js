/* jshint unused: false */

window.Platform = {};
var logFlags = {
    //dom: true,
    //data: true
};

/**
 * @see http://engineering.silk.co/post/31921750832/mutation-events-what-happens
 */
(function() {
    var attrModifiedWorks = false;
    var listener = function() {
        attrModifiedWorks = true;
    };

    var doc = document.documentElement;
    doc.addEventListener('DOMAttrModified', listener, false);
    doc.setAttribute('___TEST___', true);
    doc.removeAttribute('___TEST___', true);
    doc.removeEventListener('DOMAttrModified', listener, false);

    if (attrModifiedWorks) {
        return;
    }

    HTMLElement.prototype.__setAttribute = HTMLElement.prototype.setAttribute;
    HTMLElement.prototype.setAttribute = function(attrName, newVal) {
        var prevVal = this.getAttribute(attrName);
        this.__setAttribute(attrName, newVal);
        newVal = this.getAttribute(attrName);
        if (newVal != prevVal) {
            var evt = document.createEvent('MutationEvent');
            evt.initMutationEvent(
                'DOMAttrModified',
                true,
                false,
                this,
                prevVal || '',
                newVal || '',
                attrName,
                (prevVal == null) ? evt.ADDITION : evt.MODIFICATION
            );
            this.dispatchEvent(evt);
        }
    };

    HTMLElement.prototype.__removeAttribute = HTMLElement.prototype.removeAttribute;
    HTMLElement.prototype.removeAttribute = function(attrName) {
        var prevVal = this.getAttribute(attrName);
        this.__removeAttribute(attrName);
        var evt = document.createEvent('MutationEvent');
        evt.initMutationEvent(
            'DOMAttrModified',
            true,
            false,
            this,
            prevVal,
            '',
            attrName,
            evt.REMOVAL
        );
        this.dispatchEvent(evt);
    };
}());

/*! borschik:include:../node_modules/dom-token-list-polyfill/src/token-list.js */
/*! borschik:include:../node_modules/WeakMap/weakmap.js */
/*! borschik:include:../node_modules/MutationObservers/MutationObserver.js */

window.Platform.endOfMicrotask = (function() {
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
}());

(function() {
    /*! borschik:include:../node_modules/CustomElements/src/scope.js */
    /*! borschik:include:../node_modules/CustomElements/src/Observer.js */
    /*! borschik:include:../node_modules/CustomElements/src/CustomElements.js */
    /*! borschik:include:../node_modules/CustomElements/src/Parser.js */
    /*! borschik:include:../node_modules/CustomElements/src/boot.js */
}());

(function() {
    /*! borschik:include:../node_modules/HTMLImports/src/scope.js */
    /*! borschik:include:../node_modules/HTMLImports/src/Loader.js */
    /*! borschik:include:../node_modules/HTMLImports/src/Parser.js */
    /*! borschik:include:../node_modules/HTMLImports/src/HTMLImports.js */
    /*! borschik:include:../node_modules/HTMLImports/src/Observer.js */
    /*! borschik:include:../node_modules/HTMLImports/src/boot.js */
}());

/*! borschik:include:../node_modules/x-tag-core/src/core.js */
