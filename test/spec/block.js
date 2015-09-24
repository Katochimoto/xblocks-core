var create = require('block').create;
var xtag = require('xtag');

describe('xblocks', function () {

    describe('#create', function () {
        it('Элемент можно определить в виде массива объектов', function () {
            this.sinon.stub(xtag, 'register', function (name, params) {
                expect(name).to.equal('xb-test1');
                expect(params.methods).to.contain.all.keys('test1', 'test2');
            });

            create('xb-test1', [ {
                methods: {
                    test1: function () {}
                }
            }, {
                methods: {
                    test2: function () {}
                }
            } ]);

            xtag.register.restore();
        });

        it('События жизненного цикла (lifecycle) переопределить нельзя', function () {
            var created = function () {};
            var inserted = function () {};
            var removed = function () {};
            // var attributeChanged = function () {};

            this.sinon.stub(xtag, 'register', function (name, params) {
                expect(name).to.equal('xb-test2');
                expect(params.lifecycle.created).to.not.equal(created);
                expect(params.lifecycle.inserted).to.not.equal(inserted);
                expect(params.lifecycle.removed).to.not.equal(removed);
                // expect(params.lifecycle.attributeChanged).to.not.equal(attributeChanged);
            });

            create('xb-test2', {
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
