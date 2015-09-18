require('../tags/x-element1.jsx');

var XBElement = require('../../src/xblocks/element');
var vow = require('vow');
var ReactDOM = require('react-dom');

describe('xblocks', function() {

    describe('element', function() {
        describe('#create', function() {
            beforeEach(function() {
                this._spyInit = this.sinon.spy(XBElement.prototype, '_init');

                this.node = document.createElement('x-element1');

                var that = this;
                return new vow.Promise(function(resolve) {
                    that.node.addEventListener('xb-created', function _onXbCreated() {
                        this.removeEventListener('xb-created', _onXbCreated);
                        resolve();
                    });

                    document.body.appendChild(that.node);
                });
            });

            afterEach(function() {
                if (this.node.parentNode) {
                    this.node.parentNode.removeChild(this.node);
                }
            });

            it('узел сожержит свойство xblock с созданным объектом', function() {
                expect(this.node.xblock).to.be.an.instanceof(XBElement);
            });

            it('объект содержит свойство _node с узлом', function() {
                expect(this.node.xblock._node).to.equal(this.node);
            });

            it('выполняется вызов метода инициализации', function() {
                expect(this._spyInit.calledOnce).to.be.ok;
            });
        });

        describe('#destroy', function() {
            beforeEach(function() {
                this._spyReactUmount = this.sinon.spy(ReactDOM, 'unmountComponentAtNode');
                this.node = document.createElement('x-element1');

                var that = this;
                return new vow.Promise(function(resolve) {
                    that.node.addEventListener('xb-created', function _onXbCreated() {
                        this.removeEventListener('xb-created', _onXbCreated);
                        resolve();
                    });

                    document.body.appendChild(that.node);
                });
            });

            afterEach(function() {
                if (this.node.parentNode) {
                    this.node.parentNode.removeChild(this.node);
                }
            });

            it('должен быть вызван метод ReactDOM.unmountComponentAtNode', function() {
                this.node.xblock.destroy();
                expect(this._spyReactUmount).calledWith(this.node);
            });
        });
    });
});
