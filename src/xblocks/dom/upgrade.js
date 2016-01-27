import context from '../../context';

/**
 * @function upgrade
 */
export default (function () {
    if (context.CustomElements && typeof context.CustomElements.upgrade === 'function') {
        return context.CustomElements.upgrade;

    } else {
        return function () {};
    }
}());
