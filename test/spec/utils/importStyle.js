import testable from 'utils/importStyle';

describe('xblocks.utils.importStyle', function () {
    it('Должен добавить в head страницы стиль с id из ключа объекта', function () {
        testable(document.body, { test: 'body { color: #000; }' });
        expect(document.head.querySelector('style#test')).to.be.ok;
    });

    it('С одним ключем должен добавиться только один стиль', function () {
        testable(document.body, { test: 'body { color: #000; }' });
        testable(document.body, { test: 'body { color: #000; }' });
        expect(document.head.querySelectorAll('style#test').length).to.be.equal(1);
    });
});
