/* global describe, it, expect, xblocks, sinon, beforeEach */
/* jshint strict: false */

describe('xblocks.utils.equals', function() {
    [
        [1, 1],
        [true, true],
        ['test', 'test'],
        [null, null],
        [undefined, undefined]
    ].forEach(function(params) {
            it('Должен вернуть true для элементов одного типа и одинакового значения: ' + JSON.stringify(params), function() {
                expect(xblocks.utils.equals(params[0], params[1])).to.be.ok();
            });
        });

    it('NaN не эквивалентен самому себе', function() {
        expect(xblocks.utils.equals(NaN, NaN)).to.not.ok();
    });

    it('Функция эквивалентна самой себе', function() {
        var test = function() {};
        expect(xblocks.utils.equals(test, test)).to.be.ok();
    });

    it('Объект эквивалентен самому себе', function() {
        var test = {};
        expect(xblocks.utils.equals(test, test)).to.be.ok();
    });

    it('Функции ставнивает по содержимому toString', function() {
        expect(xblocks.utils.equals(function() {}, function() {})).to.be.ok();
    });

    it('Объекты эквивалентны если содержат одинаковый набор эквивалентных свойств', function() {
        expect(xblocks.utils.equals({test: 1}, {test: 1})).to.be.ok();
        expect(xblocks.utils.equals({test: 1}, {test: '1'})).to.not.ok();
        expect(xblocks.utils.equals({test1: 1}, {test2: 1})).to.not.ok();
        expect(xblocks.utils.equals({test: {asd: 'qwe'}}, {test: {asd: 'qwe'}})).to.be.ok();
        expect(xblocks.utils.equals({test: {asd1: 'qwe'}}, {test: {asd2: 'qwe'}})).to.not.ok();
    });
});
