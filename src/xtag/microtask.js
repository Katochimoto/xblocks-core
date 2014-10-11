window.Platform.endOfMicrotask = (function() {
    var iterations = 0;
    var callbacks = [];
    var twiddle = document.createTextNode('');
    var Mutation = window.MutationObserver || window.JsMutationObserver;

    (new Mutation(function() {
        while (callbacks.length) {
            callbacks.shift()();
        }

    })).observe(twiddle, {
        characterData: true
    });

    return function(callback) {
        twiddle.textContent = iterations++;
        callbacks.push(callback);
    };
}());
