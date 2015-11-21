var testable = require('dom/attrs');
var React = require('react');

describe('xblocks.dom.attrs', function () {
    describe('#get', function () {
        it('должен вернуть объект получаемых атрибутов без изменений если не элемент', function () {
            var element = document.createTextNode('test');
            var attrs = { 'test': undefined };

            expect(testable.get(element, attrs)).to.be.eql(attrs);
        });

        it('должен вернуть объект получаемых атрибутов без изменений если элемент не содержит атрибутов', function () {
            var element = document.createElement('div');
            var attrs = { 'test': undefined };

            expect(testable.get(element, attrs)).to.be.eql(attrs);
        });

        it('должен заменить значение только существующих атрибутов', function () {
            var element = document.createElement('div');
            element.setAttribute('a', '123');
            var attrs = { 'a': undefined, 'b': undefined };

            expect(testable.get(element, attrs)).to.be.eql({ 'a': '123', 'b': undefined });
        });

        it('должен преобразовать тип boolean, если значение по умолчаню boolean - 1', function () {
            var element = document.createElement('div');
            element.setAttribute('a', 'false');
            var attrs = { 'a': true };

            expect(testable.get(element, attrs)).to.be.eql({ 'a': false });
        });

        it('должен преобразовать тип boolean, если значение по умолчаню boolean - 2', function () {
            var element = document.createElement('div');
            element.setAttribute('a', '');
            var attrs = { 'a': false };

            expect(testable.get(element, attrs)).to.be.eql({ 'a': true });
        });
    });

    describe('#toObject', function () {
        it('должен вернуть пустой объект, если не элемент', function () {
            var element = document.createTextNode('test');
            expect(testable.toObject(element)).to.be.eql({});
        });

        it('должен вернуть пустой объект, если элемент не содержит атрибутов', function () {
            var element = document.createElement('div');
            expect(testable.toObject(element)).to.be.eql({});
        });

        it('должен вернуть объект со значениями атрибутов без изменений', function () {
            var element = document.createElement('div');
            element.setAttribute('a', 'false');
            element.setAttribute('b', '');
            element.setAttribute('c', '123');
            element.setAttribute('d', 'test');

            expect(testable.toObject(element)).to.be.eql({
                'a': 'false',
                'b': '',
                'c': '123',
                'd': 'test'
            });
        });

        it('Должен вернуть объект атрибутов элемента', function () {
            var expectAttrs = {};

            var element = document.createElement('div');
            [
                'active',
                'autofocus',
                'checked',
                'defer',
                'disabled',
                'ismap',
                'multiple',
                'readonly',
                'required',
                'selected'
            ].forEach(function (attrName) {
                expectAttrs[ attrName ] = attrName;
                element.setAttribute(attrName, attrName);
            });

            element.setAttribute('testboolean1', 'true');
            expectAttrs.testboolean1 = 'true';

            element.setAttribute('testboolean2', 'false');
            expectAttrs.testboolean2 = 'false';

            element.setAttribute('testattr', 'testValue');
            expectAttrs.testattr = 'testValue';

            expect(testable.toObject(element)).to.be.eql(expectAttrs);
        });
    });

    describe('#valueConversion', function () {
        it('должен привести значение к строке, если указан строчный тип', function () {
            expect(testable.valueConversion('a', 123, React.PropTypes.string)).to.be.eql('123');
        });

        it('должен привести значение к числу, если указан числовой тип', function () {
            expect(testable.valueConversion('a', '123', React.PropTypes.number)).to.be.eql(123);
        });
    });
});
