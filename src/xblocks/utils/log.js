import context from '../../context';

export default {
    time,
    info
};

function time(element, name) {
    if (!element._xtimers) {
        element._xtimers = {};
    }

    if (!Array.isArray(element._xtimers[ name ])) {
        element._xtimers[ name ] = [];
    }

    element._xtimers[ name ].push(context.performance.now());
}

function info() {
    context.console.info.apply(context.console, arguments);
}
