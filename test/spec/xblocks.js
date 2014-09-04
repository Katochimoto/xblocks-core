/* global describe, it, expect, xblocks, sinon, beforeEach */
/* jshint strict: false */

describe('xblocks', function() {

    xblocks.view.register('x-element', {
        render: function() {
            return null;
        }
    });

    xblocks.create('x-element');

    var xElement = document.createElement('x-element');


    describe('Создание', function() {

        it('свойство xtagName', function() {
            expect(xElement.xtagName).to.be('x-element');
        });

        it('свойство xtmpl', function() {
            expect(xElement.xtmpl).to.be.an('object');
        });

        it('свойство xuid', function() {
            expect(xElement.xuid).to.be.a('number');
            expect(xElement.xuid).to.be.above(0);
        });

        it('свойство xprops', function() {
            expect(xElement.xprops).to.be.an('object');
            expect(xElement.xprops).to.have.keys([ '_uid', 'children', 'xb-static' ]);
        });

        it('свойство mounted', function() {
            expect(xElement.mounted).to.be.a('boolean');
            expect(xElement.mounted).to.be(false);
        });

        it('свойство content', function() {
            expect(xElement.content).to.be.a('string');
            expect(xElement.content).to.be('');
        });

        it('свойство innerHTML', function() {
            expect(xElement.innerHTML).to.be.a('string');
            expect(xElement.innerHTML).to.be('');
        });

        it('свойство outerHTML', function() {
            expect(xElement.outerHTML).to.be.a('string');
            expect(xElement.outerHTML).to.be('<x-element></x-element>');
        });

        it('свойство attrs', function() {
            expect(xElement.attrs).to.be.an('object');
        });

        it('свойство state', function() {
            expect(xElement.state).to.be.an('object');
        });

        it('метод upgrade', function() {
            expect(xElement.upgrade).to.be.an('function');
        });

        it('метод cloneNode', function() {
            expect(xElement.cloneNode).to.be.an('function');
        });

        it('является потомком HTMLElement', function() {
            expect(xElement instanceof HTMLElement).to.be.ok();
        });

        it('свойство xblock отсутствует на момент создания элемента', function() {
            expect(xElement.xblock).to.be.a('undefined');
        });

        it('свойство _inserted', function() {
            expect(xElement._inserted).to.be.a('boolean');
            expect(xElement._inserted).to.be(false);
        });
    });

    describe('Вставка в DOM', function() {

        

    });

    describe('Удаление из DOM', function() {

    });

    describe('Клонирование', function() {

    });

    describe('Работа с атрибутами', function() {

    });

    describe('Изменение содержимого', function() {

    });



});
