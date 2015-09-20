var util = require('utils/equals');

describe('xblocks.utils.equals ->', function () {

    [
        [ 1, 1 ],
        [ true, true ],
        [ 'test', 'test' ],
        [ null, null ],
        [ undefined, undefined ]
    ].forEach(function (params) {
        it('Должен вернуть true для элементов одного типа и одинакового значения: ' + JSON.stringify(params), function () {
            expect(util(params[0], params[1])).to.be.ok;
        });
    });

    it('NaN не эквивалентен самому себе', function () {
        expect(util(NaN, NaN)).to.not.ok;
    });

    it('Функция эквивалентна самой себе', function () {
        var test = function () {};
        expect(util(test, test)).to.be.ok;
    });

    it('Объект эквивалентен самому себе', function () {
        var test = {};
        expect(util(test, test)).to.be.ok;
    });

    it('Массив эквивалентен самому себе', function () {
        var test = [];
        expect(util(test, test)).to.be.ok;
    });

    it('Массивы разной длны не эквивалентны', function () {
        expect(util([ 1, 2, 3 ], [ 1, 2 ])).to.not.ok;
    });

    it('Массивы с одинаковыми элементами эквивалентны', function () {
        expect(util([ 1, 2, 3 ], [ 1, 2, 3 ])).to.be.ok;
    });

    it('Массивы с одинаковыми элементами в другом порядке не эквивалентны', function () {
        expect(util([ 1, 2, 3 ], [ 3, 2, 1 ])).to.not.ok;
    });

    it('Функции ставнивает по содержимому toString', function () {
        expect(util(function () {}, function () {})).to.be.ok;
    });

    it('Объекты эквивалентны если содержат одинаковый набор эквивалентных свойств 1', function () {
        expect(util({ test: 1 }, { test: 1 })).to.be.ok;
    });

    it('Объекты эквивалентны если содержат одинаковый набор эквивалентных свойств 2', function () {
        expect(util({ test: 1 }, { test: '1' })).to.not.ok;
    });

    it('Объекты эквивалентны если содержат одинаковый набор эквивалентных свойств 3', function () {
        expect(util({ test1: 1 }, { test2: 1 })).to.not.ok;
    });

    it('Объекты эквивалентны если содержат одинаковый набор эквивалентных свойств 4', function () {
        expect(util({ test: { asd: 'qwe' } }, { test: { asd: 'qwe' } })).to.be.ok;
    });

    it('Объекты эквивалентны если содержат одинаковый набор эквивалентных свойств 5', function () {
        expect(util({ test: { asd1: 'qwe' } }, { test: { asd2: 'qwe' } })).to.not.ok;
    });

    it('Объекты эквивалентны если содержат одинаковый набор эквивалентных свойств 6', function () {
        expect(util({ a: 1 }, { a: 1, b: 2 })).to.not.ok;
    });

    it('Объекты эквивалентны если содержат одинаковый набор эквивалентных свойств 7', function () {
        expect(util({ a: 1, b: 2 }, { a: 1 })).to.not.ok;
    });

    it('Одинаковые даты эквивалентны', function () {
        var dateOrig = new Date();
        var date1 = new Date(dateOrig);
        var date2 = new Date(dateOrig);
        expect(util(date1, date2)).to.be.ok;
    });

    it('Одинаковые регулярные выражения эквивалентны', function () {
        expect(util(/test/, /test/)).to.be.ok;
    });
});
