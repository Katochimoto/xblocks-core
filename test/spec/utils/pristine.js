/* global describe, it, expect, xblocks, sinon, beforeEach */
/* jshint strict: false */

describe('xblocks.utils.pristine', function() {
    it('Должна вернуть true, если глобальный объект не переопределен', function() {
        expect(xblocks.utils.pristine('setTimeout')).to.be.ok();
    });

    it('Должна вернуть false, если глобальный объект переопределен', function() {
        sinon.stub(window, 'setTimeout');
        expect(xblocks.utils.pristine('setTimeout')).to.not.ok();
    });
});