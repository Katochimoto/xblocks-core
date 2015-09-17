var xblocks = require('../../src/xblocks.js');

describe('xblocks.create ->', function() {

    it('Элемент можно определить в виде массива объектов', function() {
        this.sinon.stub(xblocks.tag, 'register', function(name, params) {
            expect(name).to.equal('xb-test1');
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

        xblocks.tag.register.restore();
    });

    it('События жизненного цикла (lifecycle) переопределить нельзя', function() {
        var created = function() {};
        var inserted = function() {};
        var removed = function() {};
        var attributeChanged = function() {};

        this.sinon.stub(xblocks.tag, 'register', function(name, params) {
            expect(name).to.equal('xb-test2');
            expect(params.lifecycle.created).to.not.equal(created);
            expect(params.lifecycle.inserted).to.not.equal(inserted);
            expect(params.lifecycle.removed).to.not.equal(removed);
            expect(params.lifecycle.attributeChanged).to.not.equal(attributeChanged);
        });

        xblocks.create('xb-test2', {
            lifecycle: {
                created: created,
                inserted: inserted,
                removed: removed,
                attributeChanged: attributeChanged
            }
        });

        xblocks.tag.register.restore();
    });
});
