require('../tags/x-element1.jsx');

var XBElement = require('element').XBElement;
var vow = require('vow');
var ReactDOM = require('react-dom');
import Constants from 'constants';

describe('xblocks', function () {

    describe('element', function () {
        describe('#create', function () {
            beforeEach(function () {
                this._spyInit = this.sinon.spy(XBElement.prototype, '_init');

                this.node = document.createElement('x-element1');

                var that = this;
                return new vow.Promise(function (resolve) {
                    that.node.addEventListener('xb-created', function _onXbCreated() {
                        this.removeEventListener('xb-created', _onXbCreated);
                        resolve();
                    });

                    document.body.appendChild(that.node);
                });
            });

            afterEach(function () {
                if (this.node.parentNode) {
                    this.node.parentNode.removeChild(this.node);
                }
            });

            it('узел сожержит свойство xblock с созданным объектом', function () {
                expect(this.node[ Constants.BLOCK ]).to.be.an.instanceof(XBElement);
            });

            it('объект содержит свойство _node с узлом', function () {
                expect(this.node[ Constants.BLOCK ]._node).to.equal(this.node);
            });

            it('выполняется вызов метода инициализации', function () {
                expect(this._spyInit.calledOnce).to.be.ok;
            });
        });

        describe('#destroy', function () {
            beforeEach(function () {
                this._spyReactUmount = this.sinon.spy(ReactDOM, 'unmountComponentAtNode');
                this.node = document.createElement('x-element1');

                var that = this;
                return new vow.Promise(function (resolve) {
                    that.node.addEventListener('xb-created', function _onXbCreated() {
                        this.removeEventListener('xb-created', _onXbCreated);
                        resolve();
                    });

                    document.body.appendChild(that.node);
                });
            });

            afterEach(function () {
                if (this.node.parentNode) {
                    this.node.parentNode.removeChild(this.node);
                }
            });

            it('должен быть вызван метод ReactDOM.unmountComponentAtNode', function () {
                this.node[ Constants.BLOCK ].destroy();
                expect(this._spyReactUmount).calledWith(this.node);
            });
        });
    });

    describe('#getMountedComponent', function () {
        beforeEach(function () {
            this.node = document.createElement('x-element1');

            var that = this;
            return new vow.Promise(function (resolve) {
                that.node.addEventListener('xb-created', function _onXbCreated() {
                    this.removeEventListener('xb-created', _onXbCreated);
                    resolve();
                });

                document.body.appendChild(that.node);
            });
        });

        it('должен вернуть компонент React', function () {
            var proto = Object.getPrototypeOf(this.node[ Constants.BLOCK ].getMountedComponent());
            expect(proto).to.include.keys([ 'render' ]);
        });
    });

    describe('#getMountedContent', function () {
        beforeEach(function () {
            this.node = document.createElement('x-element1');
            this.content = document.createElement('div');
            this.content.setAttribute('data-test', 'getMountedContent');

            this.node.appendChild(this.content);

            var that = this;
            return new vow.Promise(function (resolve) {
                that.node.addEventListener('xb-created', function _onXbCreated() {
                    this.removeEventListener('xb-created', _onXbCreated);
                    resolve();
                });

                document.body.appendChild(that.node);
            });
        });

        it('должен вернуть строку содержимое компонента', function () {
            expect(this.node[ Constants.BLOCK ].getMountedContent()).to.equal(this.content.outerHTML);
        });
    });

    describe('#setMountedContent', function () {
        beforeEach(function () {
            this.node = document.createElement('x-element1');

            var that = this;
            return new vow.Promise(function (resolve) {
                that.node.addEventListener('xb-created', function _onXbCreated() {
                    this.removeEventListener('xb-created', _onXbCreated);
                    resolve();
                });

                document.body.appendChild(that.node);
            });
        });

        it('должен изменить содержимое контента блока', function () {
            var content = 'setMountedContent';
            var that = this;
            return new vow.Promise(function (resolve) {
                that.node.addEventListener('xb-update', function _onXbUpdate() {
                    this.removeEventListener('xb-update', _onXbUpdate);
                    expect(that.node[ Constants.BLOCK ].getMountedContent()).to.equal(content);
                    resolve();
                });

                that.node[ Constants.BLOCK ].setMountedContent(content);
            });
        });
    });
});
