var util = require('../../../src/xblocks/utils/type');

describe('xblocks.utils.type ->', function() {

    [
        [ '', 'string' ],
        [ true, 'boolean' ],
        [ 1, 'integer' ],
        [ 1.1, 'float' ],
        [ ({}), 'object' ],
        [ (function() {}), 'function' ],
        [ null, 'null' ],
        [ undefined, 'undefined' ],
        [ NaN, 'NaN' ],
        [ /123/, 'regexp' ],
        [ (new String('')), 'string' ],
        [ (new Object()), 'object' ],
        [ (new RegExp('123')), 'regexp' ],
        [ (new Function('')), 'function' ],
        [ (new Date()), 'date' ],
        [ Math, 'math' ]
    ].forEach(function(params) {
        it('Должен вернуть строку с типом: ' + JSON.stringify(params), function() {
            expect(util(params[0])).to.equal(params[1]);
        });
    });
});
