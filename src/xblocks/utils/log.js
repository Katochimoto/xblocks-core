import context from '../../context';

export function time(element, name) {
    if (!element._xtimers) {
        element._xtimers = {};
    }

    if (!Array.isArray(element._xtimers[ name ])) {
        element._xtimers[ name ] = [];
    }

    element._xtimers[ name ].push(context.performance.now());
}

export function info() {
    context.console.info.apply(context.console, arguments);
}
