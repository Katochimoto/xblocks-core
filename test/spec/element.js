/* global describe, it, expect, xblocks, sinon, beforeEach */
/* jshint strict: false */

describe('xblocks.element', function() {

    describe('Инициализация', function() {
        it('', function() {
            sinon.stub(xblocks.element.prototype, '_init');
            var node = document.createElement('DIV');
            var element = new xblocks.element(node);
            expect(element._name).to.be('div');
            expect(xblocks.element.prototype._init).calledOnce();
            xblocks.element.prototype._init.restore();
        });

        it('', function() {
            sinon.stub(xblocks.element.prototype, '_init');
            var node = document.createElement('DIV');
            var element = new xblocks.element(node);
            expect(element._node).to.be(node);
            expect(xblocks.element.prototype._init).calledOnce();
            xblocks.element.prototype._init.restore();
        });

        it('', function() {
            sinon.stub(React, 'renderComponent');
            var element = new xblocks.element(document.createElement('DIV'));
            expect(React.renderComponent).calledOnce();
            React.renderComponent.restore();
        });

        it('', function() {
            sinon.stub(React, 'renderComponentToStaticMarkup');
            var node = document.createElement('DIV');
            node.setAttribute(xblocks.dom.attrs.XB_ATTRS.STATIC, '');
            var element = new xblocks.element(node);
            expect(React.renderComponentToStaticMarkup).calledOnce();
            React.renderComponentToStaticMarkup.restore();
        });

        it('', function(next) {
            var node = document.createElement('DIV');
            var cb = function() {
                node.removeEventListener('xb-created', cb, false);
                next();
            };
            node.addEventListener('xb-created', cb, false);
            new xblocks.element(node);
        });

    });

});
