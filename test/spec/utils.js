/* global describe, it, expect, xblocks, sinon, beforeEach */
/* jshint strict: false */

describe('xblocks.utils', function() {
    describe('#equals', function() {
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

        it('Функции эквивалентны всегда', function() {
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

    describe('#pristine', function() {
        it('Должна вернуть true, если глобальный объект не переопределен', function() {
            expect(xblocks.utils.pristine('setTimeout')).to.be.ok();
        });

        it('Должна вернуть false, если глобальный объект переопределен', function() {
            sinon.stub(window, 'setTimeout');
            expect(xblocks.utils.pristine('setTimeout')).to.not.ok();
        });
    });

    describe('#type', function() {
        [
            [ '', 'string' ],
            [ true, 'boolean' ],
            [ 1, 'number' ],
            [ ({}), 'object' ],
            [ (function(){}), 'function' ],
            [ null, 'null' ],
            [ undefined, 'undefined' ],
            [ NaN, 'number' ],
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

    describe('#merge', function() {
        it('Должен вернуть объединенный объект', function() {
            var obj = {test1: 1};
            xblocks.utils.merge(obj, {test2: 2});
            expect(obj).to.be.eql({ test1: 1, test2: 2 });
        });

        it('Должен вернуть объединенный объект, без учета вложенности', function() {
            var obj = {test1: { test2: 2 }};
            xblocks.utils.merge(obj, {test1: 1}, {test2: 2});
            expect(obj).to.be.eql({ test1: 1, test2: 2 });
        });

        it('Если первый аргумент true, должен вернуть объединенный объект, с учетом вложенности', function() {
            var obj = {test1: { test2: 2 }};
            xblocks.utils.merge(true, obj, {test1: { test3: 3 }}, {test4: 4});
            expect(obj).to.be.eql({ test1: { test2: 2, test3: 3 }, test4: 4 });
        });
    });
});
