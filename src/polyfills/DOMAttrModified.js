/* jshint -W067 */
/**
 * @see http://engineering.silk.co/post/31921750832/mutation-events-what-happens
 */
(function(global) {
    'use strict';

    var attrModifiedWorks = false;
    var listener = function() {
        attrModifiedWorks = true;
    };

    var doc = global.document.documentElement;
    doc.addEventListener('DOMAttrModified', listener, false);
    doc.setAttribute('___TEST___', true);
    doc.removeEventListener('DOMAttrModified', listener, false);
    doc.removeAttribute('___TEST___', true);

    if (attrModifiedWorks) {
        return;
    }

    var proto = global.Element.prototype;

    proto.__setAttribute = proto.setAttribute;
    proto.setAttribute = function(attrName, newVal) {
        var prevVal = this.getAttribute(attrName);
        this.__setAttribute(attrName, newVal);
        newVal = this.getAttribute(attrName);
        if (newVal != prevVal) {
            var evt = global.document.createEvent('MutationEvent');
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
        var evt = global.document.createEvent('MutationEvent');
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

}(function() {
    return this || (1, eval)('this');
}()));