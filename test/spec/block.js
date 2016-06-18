require('../tags/x-element-accessors.jsx');

var create = require('block').create;
var dispatch = require('event').dispatch;
var xtag = require('xtag');
var vow = require('vow');

describe('xblocks', function () {

    describe('#create', function () {
        it('Элемент можно определить в виде массива объектов', function () {
            var Element = create('xb-test1', [ {
                methods: {
                    test1: function () {}
                }
            }, {
                methods: {
                    test2: function () {}
                }
            } ]);

            var node = new Element();

            expect(node.tagName).to.equal('XB-TEST1');
            expect(node).to.have.property('test1');
            expect(node).to.have.property('test2');
        });

        it('Элемент можно определить в виде объекта', function () {
            var Element = create('xb-test2', {
                methods: {
                    test1: function () {},
                    test2: function () {}
                }
            });

            var node = new Element();

            expect(node.tagName).to.equal('XB-TEST2');
            expect(node).to.have.property('test1');
            expect(node).to.have.property('test2');
        });

        it('События жизненного цикла (lifecycle) переопределить нельзя', function () {
            var created = function () {};
            var inserted = function () {};
            var removed = function () {};
            // var attributeChanged = function () {};

            this.sinon.stub(xtag, 'register', function (name, params) {
                expect(name).to.equal('xb-test3');
                expect(params.lifecycle.created).to.not.equal(created);
                expect(params.lifecycle.inserted).to.not.equal(inserted);
                expect(params.lifecycle.removed).to.not.equal(removed);
                // expect(params.lifecycle.attributeChanged).to.not.equal(attributeChanged);
            });

            create('xb-test3', {
                lifecycle: {
                    created: created,
                    inserted: inserted,
                    removed: removed
                    // attributeChanged: attributeChanged
                }
            });

            xtag.register.restore();
        });

        describe('Наследование событий', function () {
            it('События должны вызываться в порядке объявления', function () {
                var spy1 = this.sinon.spy();
                var spy2 = this.sinon.spy();
                var spy3 = this.sinon.spy();

                var Element = create('xb-inheritance-events-test1', [ {
                    events: { event1: spy1 }
                }, {
                    events: { event1: spy2 }
                }, {
                    events: { event1: spy3 }
                } ]);

                dispatch(new Element(), 'event1');

                expect(spy2.calledAfter(spy1)).to.be.ok;
                expect(spy3.calledAfter(spy2)).to.be.ok;
            });

            it('Выполнение событий можно прервать через вызов stopImmediatePropagation', function () {
                var spy1 = this.sinon.spy(function (event) {
                    event.stopImmediatePropagation();
                });
                var spy2 = this.sinon.spy();

                var Element = create('xb-inheritance-events-test2', [ {
                    events: { event1: spy1 }
                }, {
                    events: { event1: spy2 }
                } ]);

                dispatch(new Element(), 'event1');

                expect(spy1.callCount).to.be.equal(1);
                expect(spy2.callCount).to.be.equal(0);
            });
        });

        describe('Наследование событий изменения свойств', function () {
            it('События должны вызываться в порядке объявления', function () {
                var spy1 = this.sinon.spy();
                var spy2 = this.sinon.spy();
                var spy3 = this.sinon.spy();

                var Element = create('xb-properties-events-test1', [ {
                    accessors: { prop1: { set: spy1 } }
                }, {
                    accessors: { prop1: { set: spy2 } }
                }, {
                    accessors: { prop1: { set: spy3 } }
                } ]);

                (new Element()).prop1 = 'test';

                expect(spy2.calledAfter(spy1)).to.be.ok;
                expect(spy3.calledAfter(spy2)).to.be.ok;
            });
        });

        describe('Ко всем accessors, определенным во view, добавляется set событие с обновлением вида при изменении', function () {
            beforeEach(function () {
                this.node = document.createElement('x-element-accessors');

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

            it('Без изменения свойства значение ноды равно undefined', function () {
                expect(this.node.firstChild.textContent).to.equal('undefined');
            });

            it('Начальное значение переменной не определено', function () {
                expect(this.node._test1).to.be.undefined;
            });

            it('При измеении значения свойства должно сработать пользовательское событие', function () {
                var that = this;

                return new vow.Promise(function (resolve) {
                    that.node.addEventListener('xb-update', function _onXbUpdate() {
                        this.removeEventListener('xb-update', _onXbUpdate);
                        expect(this._test1).to.equal('qwe');
                        resolve();
                    });

                    that.node.test1 = 'qwe';
                });
            });

            it('При измеении значения свойства должно сработать обновление элемента', function () {
                var that = this;

                return new vow.Promise(function (resolve) {
                    that.node.addEventListener('xb-update', function _onXbUpdate() {
                        this.removeEventListener('xb-update', _onXbUpdate);
                        expect(this.firstChild.textContent).to.equal('qwe');
                        resolve();
                    });

                    that.node.test1 = 'qwe';
                });
            });
        });
    });
});
