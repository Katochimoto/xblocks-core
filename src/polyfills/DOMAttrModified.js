/**
 * @see http://engineering.silk.co/post/31921750832/mutation-events-what-happens
 */

import context from '../context';

/**
 * The sign of the change events of an attribute.
 * @type {boolean}
 * @private
 */
let attrModifiedWorks = false;

/**
 * Helper function.
 * @private
 */
let listener = function () {
    attrModifiedWorks = true;
};

let htmlElement = context.document.documentElement;
htmlElement.addEventListener('DOMAttrModified', listener, false);
htmlElement.setAttribute('___TEST___', true);
htmlElement.removeEventListener('DOMAttrModified', listener, false);
htmlElement.removeAttribute('___TEST___', true);

if (!attrModifiedWorks) {
    let proto = context.Element.prototype;

    proto.__setAttribute = proto.setAttribute;

    /**
     * Set attribute.
     * @param {string} attrName
     * @param {string} newVal
     */
    proto.setAttribute = function (attrName, newVal) {
        let prevVal = this.getAttribute(attrName);
        this.__setAttribute(attrName, newVal);
        newVal = this.getAttribute(attrName);
        if (newVal !== prevVal) {
            let evt = context.document.createEvent('MutationEvent');
            evt.initMutationEvent(
                'DOMAttrModified',
                true,
                false,
                this,
                prevVal || '',
                newVal || '',
                attrName,
                (prevVal === null) ? evt.ADDITION : evt.MODIFICATION
            );
            this.dispatchEvent(evt);
        }
    };

    proto.__removeAttribute = proto.removeAttribute;

    /**
     * Remote attribute.
     * @example
     * node.removeAttribute('attr');
     * @param {string} attrName
     */
    proto.removeAttribute = function (attrName) {
        let prevVal = this.getAttribute(attrName);
        this.__removeAttribute(attrName);
        let evt = context.document.createEvent('MutationEvent');
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
