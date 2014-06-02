describe('xblocks.dom', function() {
    describe('xblocks.dom.attrs', function() {
        describe('#getRealValue', function() {
            xblocks.dom.attrs.ARRTS_BOOLEAN.forEach(function(attrName) {
                it('Должен вернуть true для boolean атрибута, имеющего пустое значение', function() {
                    expect(xblocks.dom.attrs.getRealValue(attrName, '')).to.be.ok();
                });

                it('Должен вернуть true для boolean атрибута, имеющего значение, равное названию', function() {
                    expect(xblocks.dom.attrs.getRealValue(attrName, attrName)).to.be.ok();
                });

                it('Должен вернуть true для boolean атрибута, имеющего значение true', function() {
                    expect(xblocks.dom.attrs.getRealValue(attrName, 'true')).to.be.ok();
                });

                it('Должен вернуть false для boolean атрибута, имеющего значение false', function() {
                    expect(xblocks.dom.attrs.getRealValue(attrName, 'false')).to.not.ok();
                });
            });

            it('Должен вернуть true, если произвольный атрибут имеет значение true', function() {
                expect(xblocks.dom.attrs.getRealValue('testboolean', 'true')).to.be.ok();
            });

            it('Должен вернуть false, если произвольный атрибут имеет значение false', function() {
                expect(xblocks.dom.attrs.getRealValue('testboolean', 'false')).to.not.ok();
            });

            it('Должен вернуть значение атрибута, если оно отлично от true или false', function() {
                expect(xblocks.dom.attrs.getRealValue('testattr', 'testValue')).to.be.equal('testValue');
            });
        });

        describe('#toObject', function() {
            it('Должен вернуть объект атрибутов элемента', function() {
                var expectAttrs = {};

                var element = document.createElement('div');
                xblocks.dom.attrs.ARRTS_BOOLEAN.forEach(function(attrName) {
                    expectAttrs[attrName] = true;
                    element.setAttribute(attrName, attrName);
                });

                element.setAttribute('testboolean1', 'true');
                expectAttrs['testboolean1'] = true;

                element.setAttribute('testboolean2', 'false');
                expectAttrs['testboolean2'] = false;

                element.setAttribute('testattr', 'testValue');
                expectAttrs['testattr'] = 'testValue';

                expect(xblocks.dom.attrs.toObject(element)).to.be.eql(expectAttrs);
            });
        });
    });

});
