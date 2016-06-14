require('../tags/x-element-accessors.jsx');

var create = require('block').create;
var xtag = require('xtag');
var vow = require('vow');

describe.only('xblocks', function () {

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

        it('Ко всем accessors, определенным во view, добавляется set событие с обновлением вида при изменении', function () {
            this.node = document.createElement('x-element-accessors');

            var that = this;
            return new vow.Promise(function (resolve) {
                that.node.addEventListener('xb-created', function _onXbCreated() {
                    this.removeEventListener('xb-created', _onXbCreated);

                    this.addEventListener('xb-update', function _onXbUpdate() {
                        this.removeEventListener('xb-update', _onXbUpdate);

                        expect(this._test1).to.equal('qwe');
                        expect(this.firstChild.textContent).to.equal('qwe');
                        resolve();
                    });

                    expect(this._test1).to.be.undefined;
                    expect(this.firstChild.textContent).to.equal('null');

                    that.node.test1 = 'qwe';
                });

                document.body.appendChild(that.node);
            });
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
    });
});
