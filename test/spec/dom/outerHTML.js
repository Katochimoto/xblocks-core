import testable from 'dom/outerHTML';

describe('xblocks/dom/outerHTML', function () {
    describe('#get', function () {
        it('должен вернуть html элемента', function () {
            var element = document.createElement('div');
            expect(testable.get.call(element)).to.be.eql('<div></div>');
        });
    });
});
