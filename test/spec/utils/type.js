/* global describe, it, expect, xblocks, sinon, beforeEach */
/* jshint strict: false */

describe('xblocks.utils.type', function() {
    [
        [ '', 'string' ],
        [ true, 'boolean' ],
        [ 1, 'integer' ],
        [ ({}), 'object' ],
        [ (function(){}), 'function' ],
        [ null, 'null' ],
        [ undefined, 'undefined' ],
        [ NaN, 'nan' ],
        [ /123/, 'regexp' ],
        [ (new String('')), 'string' ],
        [ (new Object()), 'object' ],
        [ (new RegExp('123')), 'regexp' ],
        [ (new Function('')), 'function' ],
        [ (new Date()), 'date' ],
        [ Math, 'math' ]
    ].forEach(function(params) {
            it('Должен вернуть строку с типом: ' + JSON.stringify(params), function() {
                expect(xblocks.utils.type(params[0])).to.be(params[1]);
            });
        });
});
