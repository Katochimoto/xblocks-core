import context from '../../context';

/**
 * @module xblocks-core/dom/upgrade
 */
export default (function () {
    if (context.CustomElements && typeof context.CustomElements.upgrade === 'function') {
        return context.CustomElements.upgrade;

    } else {
        return function () {};
    }
}());
