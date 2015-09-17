var xblocks = require('../../src/xblocks.js');

describe('xblocks.element', function() {

    describe('.create ->', function() {

        beforeEach(function() {
            this._stubInit = this.sinon.stub(xblocks.Element.prototype, '_init');

            this.node = document.createElement('div');
            this.element = new xblocks.Element(this.node);
        });

        it('создается объект xblocks.Element', function() {
            expect(this.element).to.be.a(xblocks.Element);
        });

        it('узел сожержит свойство xblock с созданным объектом', function() {
            expect(this.node.xblock).to.equal(this.element);
        });

        it('объект содержит свойство _node с узлом', function() {
            expect(this.element._node).to.equal(this.node);
        });

        it('выполняется вызов метода инициализации', function() {
            expect(this._stubInit.calledOnce).to.be.ok();
        });
    });

    describe('#destroy ->', function() {

        beforeEach(function() {
            this.sinon.stub(xblocks.Element.prototype, '_init');

            this.node = document.createElement('div');

            this._stubUnmount = this.sinon.stub(xblocks.Element.prototype, 'unmount');
            this._stubReactUmount = this.sinon.stub(xblocks.react, 'unmountComponentAtNode').withArgs(this.node);

            this.element = new xblocks.Element(this.node);
            this.element.destroy();
        });

        it('должен быть вызван метод unmount', function() {
            expect(this._stubUnmount.calledOnce).to.be.ok();
        });

        it('должен быть вызван метод xblocks.react.unmountComponentAtNode', function() {
            expect(this._stubReactUmount.calledOnce).to.be.ok();
        });
    });
});
