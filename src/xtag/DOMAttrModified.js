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
