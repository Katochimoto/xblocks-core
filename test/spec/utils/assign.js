var util = require('../../../src/xblocks/utils/assign');

describe('xblocks.utils.assign ->', function() {
    it('Должен вернуть объединенный объект', function() {
        var obj = { test1: 1 };
        util(obj, { test2: 2 });
        expect(obj).to.be.eql({ test1: 1, test2: 2 });
    });

    it('Должен вернуть объединенный объект, без учета вложенности', function() {
        var obj = { test1: { test2: 2 } };
        util(obj, { test1: 1 }, { test2: 2 });
        expect(obj).to.be.eql({ test1: 1, test2: 2 });
    });

    it('Если первый аргумент true, должен вернуть объединенный объект, с учетом вложенности', function() {
        var obj = { test1: { test2: 2 } };
        util(true, obj, { test1: { test3: 3 } }, { test4: 4 });
        expect(obj).to.be.eql({ test1: { test2: 2, test3: 3 }, test4: 4 });
    });

    it('При мерже массивов должен сохранятся тип Array', function() {
        var obj = { test1: [ { test2: 2 }, { test3: 3 } ] };
        util(true, obj, { test1: [ { test4: 4 } ] });
        expect(obj).to.be.eql({ test1: [ { test2: 2, test4: 4 }, { test3: 3 } ] });
    });

    it('Если первый аргумент не указан, то создается новый объект', function() {
        var obj = util(null, { a: 1 }, { b: 2 });
        expect(obj).to.be.eql({ a: 1, b: 2 });
    });

    it('Если первый аргумент boolean а второй аргумент не указан, то создается новый объект', function() {
        var obj = util(true, null, { a: { b: 2 } }, { a: { c: 3 } });
        expect(obj).to.be.eql({ a: { b: 2, c: 3 } });
    });

    it('undefined значения при мерже теряются', function() {
        var obj = util({}, { a: 1, b: undefined }, { a: undefined, c: undefined });
        expect(obj).to.be.eql({ a: undefined, b: undefined, c: undefined });
    });
});
