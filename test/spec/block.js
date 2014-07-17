/* global describe, it, expect, xblocks, sinon, beforeEach */
/* jshint strict: false */

describe('xblocks.create', function() {

    describe('Элемент можно определить в виде массива объектов', function() {
        sinon.stub(xtag, 'register', function(name, params) {
            expect(name).to.be('xb-test1');
            expect(params.methods).to.have.keys('test1', 'test2');
        });

        xblocks.create('xb-test1', [{
            methods: {
                test1: function() {}
            }
        }, {
            methods: {
                test2: function() {}
            }
        }]);

        xtag.register.restore();
    });

    describe('События жизненного цикла (lifecycle) переопределить нельзя', function() {
        var created = function() {};
        var inserted = function() {};
        var removed = function() {};
        var attributeChanged = function() {};

        sinon.stub(xtag, 'register', function(name, params) {
            expect(name).to.be('xb-test2');
            expect(params.lifecycle.created).not.to.be(created);
            expect(params.lifecycle.inserted).not.to.be(inserted);
            expect(params.lifecycle.removed).not.to.be(removed);
            expect(params.lifecycle.attributeChanged).not.to.be(attributeChanged);
        });

        xblocks.create('xb-test2', {
            lifecycle: {
                created: created,
                inserted: inserted,
                removed: removed,
                attributeChanged: attributeChanged
            }
        });

        xtag.register.restore();
    });
});
