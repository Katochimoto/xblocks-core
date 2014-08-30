/* global describe, it, expect, xblocks, sinon, beforeEach */
/* jshint strict: false */

describe('xblocks.element', function() {
    xblocks.view.register('x-element', {
        render: function() {
            return null;
        }
    });

    xblocks.create('x-element');

    var xElement = document.createElement('x-element');


    describe('Инициализация', function() {
        it('После создания элемента, объект должен содержать свойство xtagName', function() {
            expect(xElement.xtagName).to.be('x-element');
        });

        it('После создания элемента, объект должен содержать свойство xtmpl', function() {
            expect(xElement.xtmpl).to.be.an('object');
        });

        it('После создания элемента, объект должен содержать свойство xuid', function() {
            expect(xElement.xuid).to.be.a('number');
            expect(xElement.xuid).to.be.above(0);
        });

        it('После создания элемента, объект должен содержать свойство xprops', function() {
            expect(xElement.xprops).to.be.an('object');
            expect(xElement.xprops).to.have.keys([ '_uid', 'children', 'xb-static' ]);
        });

        it('После создания элемента, объект должен содержать свойство mounted', function() {
            expect(xElement.mounted).to.be.a('boolean');
            expect(xElement.mounted).to.be(false);
        });

        it('После создания элемента, объект должен содержать свойство content', function() {
            expect(xElement.content).to.be.a('string');
            expect(xElement.content).to.be('');
        });

        it('После создания элемента, объект должен содержать свойство attrs', function() {
            expect(xElement.attrs).to.be.an('object');
        });

        it('После создания элемента, объект должен содержать свойство state', function() {
            expect(xElement.state).to.be.an('object');
        });

        it('После создания элемента, объект должен содержать метод upgrade', function() {
            expect(xElement.upgrade).to.be.an('function');
        });

        it('После создания элемента, объект должен содержать метод cloneNode', function() {
            expect(xElement.cloneNode).to.be.an('function');
        });
    });

});
