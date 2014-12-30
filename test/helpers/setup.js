/* global afterEach, beforeEach, sinon */
(function() {

    var clearTestContext = function(context) {
        if (!context || typeof context !== 'object') {
            return;
        }

        for (var property in context) {
            if (context.hasOwnProperty(property)) {
                delete context[ property ];
            }
        }
    };

    beforeEach(function() {
        this.sinon = sinon.sandbox.create();
    });

    afterEach(function() {
        this.sinon.restore();
        clearTestContext(this);
    });

}());
