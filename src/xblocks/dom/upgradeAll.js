import context from '../../context';

/**
 * @module xblocks/dom/upgradeAll
 */
export default (function () {
    if (context.CustomElements && typeof context.CustomElements.upgradeAll === 'function') {
        return context.CustomElements.upgradeAll;

    } else {
        return function () {};
    }
}());
