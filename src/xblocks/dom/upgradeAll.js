import context from '../../context';

/**
 * @function upgradeAll
 */
export default (function () {
    if (context.CustomElements && typeof context.CustomElements.upgradeAll === 'function') {
        return context.CustomElements.upgradeAll;

    } else {
        return function () {};
    }
}());
