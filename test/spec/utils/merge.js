/* global describe, it, expect, xblocks, sinon, beforeEach */
/* jshint strict: false */

describe('xblocks.utils.merge', function() {
    it('Должен вернуть объединенный объект', function() {
        var obj = { test1: 1 };
        xblocks.utils.merge(obj, { test2: 2 });
        expect(obj).to.be.eql({ test1: 1, test2: 2 });
    });

    it('Должен вернуть объединенный объект, без учета вложенности', function() {
        var obj = { test1: { test2: 2 } };
        xblocks.utils.merge(obj, { test1: 1 }, { test2: 2 });
        expect(obj).to.be.eql({ test1: 1, test2: 2 });
    });

    it('Если первый аргумент true, должен вернуть объединенный объект, с учетом вложенности', function() {
        var obj = { test1: { test2: 2 } };
        xblocks.utils.merge(true, obj, { test1: { test3: 3 } }, { test4: 4 });
        expect(obj).to.be.eql({ test1: { test2: 2, test3: 3 }, test4: 4 });
    });
});
