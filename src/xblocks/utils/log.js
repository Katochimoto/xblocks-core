import context from '../../context';

/**
 * @param {HTMLElement} element
 * @param {string} name
 */
export function time(element, name) {
    if (!element._xtimers) {
        element._xtimers = {};
    }

    if (!Array.isArray(element._xtimers[ name ])) {
        element._xtimers[ name ] = [];
    }

    element._xtimers[ name ].push(context.performance.now());
}

/**
 * Console output info.
 * @param {...*} args
 */
export function info(...args) {
    ::context.console.info(...args);
}
