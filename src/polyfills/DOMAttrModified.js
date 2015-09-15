/**
 * @see http://engineering.silk.co/post/31921750832/mutation-events-what-happens
 */

'use strict';

var context = require('../context');
var attrModifiedWorks = false;
var listener = function() {
    attrModifiedWorks = true;
};

var htmlElement = context.document.documentElement;
htmlElement.addEventListener('DOMAttrModified', listener, false);
htmlElement.setAttribute('___TEST___', true);
htmlElement.removeEventListener('DOMAttrModified', listener, false);
htmlElement.removeAttribute('___TEST___', true);

if (!attrModifiedWorks) {
    var proto = context.Element.prototype;

    proto.__setAttribute = proto.setAttribute;
    proto.setAttribute = function(attrName, newVal) {
        var prevVal = this.getAttribute(attrName);
        this.__setAttribute(attrName, newVal);
        newVal = this.getAttribute(attrName);
        if (newVal != prevVal) {
            var evt = context.document.createEvent('MutationEvent');
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

    proto.__removeAttribute = proto.removeAttribute;
    proto.removeAttribute = function(attrName) {
        var prevVal = this.getAttribute(attrName);
        this.__removeAttribute(attrName);
        var evt = context.document.createEvent('MutationEvent');
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
}
