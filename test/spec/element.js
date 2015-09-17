var xblocks = require('../../src/xblocks');
var XBElement = require('../../src/xblocks/element');

xdescribe('xblocks.element', function() {

    describe('.create ->', function() {

        beforeEach(function() {
            this._stubInit = this.sinon.stub(XBElement.prototype, '_init');

            this.node = document.createElement('div');
            this.element = new XBElement(this.node);
        });

        it('создается объект XBElement', function() {
            expect(this.element).to.be.a(XBElement);
        });

        it('узел сожержит свойство xblock с созданным объектом', function() {
            expect(this.node.xblock).to.equal(this.element);
        });

        it('объект содержит свойство _node с узлом', function() {
            expect(this.element._node).to.equal(this.node);
        });

        it('выполняется вызов метода инициализации', function() {
            expect(this._stubInit.calledOnce).to.be.ok;
        });
    });

    describe('#destroy ->', function() {

        beforeEach(function() {
            this.node = document.createElement('div');

            this._stubReactUmount = this.sinon.stub(ReactDOM, 'unmountComponentAtNode').withArgs(this.node);

            this.element = new XBElement(this.node);

            var that = this;
            return new vow.Promise(function(resolve) {
                that.node.addEventListener('xb-created', function _onXbCreated() {
                    that.node.removeEventListener('xb-created', _onXbCreated);
                    resolve();
                });
            });
        });

        it('должен быть вызван метод ReactDOM.unmountComponentAtNode', function() {
            this.element.destroy();
            console.log(this._stubReactUmount.calledOnce);
            expect(this._stubReactUmount.calledOnce).to.be.ok;
        });
    });
});
