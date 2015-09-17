describe('xblocks - работа с атрибутами ->', function() {

    beforeEach(function() {
        this.xElement = document.createElement('x-element');
    });

    afterEach(function() {
        delete this.xElement;
    });

    it('при добавлении атрибута, он должен быть доступен при вызове getAttribute', function() {
        this.xElement.setAttribute('test', '123');
        expect(this.xElement.getAttribute('test')).to.equal('123');
    });

    it('при добавлении атрибута, он должен быть доступен в свойстве attrs', function() {
        this.xElement.setAttribute('test', '123');
        expect(this.xElement.attrs['test']).to.equal('123');
    });

    it('при добавлении атрибута, он должен быть доступен в свойстве state', function() {
        this.xElement.setAttribute('test', '123');
        expect(this.xElement.state['test']).to.equal('123');
    });


    describe('приведение к типу boolean атрибутов ->', function() {
        [
            'active',
            'autofocus',
            'checked',
            'defer',
            'disabled',
            'ismap',
            'multiple',
            'readonly',
            'required',
            'selected'
        ].forEach(function(attrName) {
            it.call(this, attrName + 'checked - state: строка "true" приводится к true', function() {
                this.xElement.setAttribute(attrName, 'true');
                expect(this.xElement.state[attrName]).to.equal(true);
            });

            it.call(this, attrName + ' - state: строка "false" приводится к false', function() {
                this.xElement.setAttribute(attrName, 'false');
                expect(this.xElement.state[attrName]).to.equal(false);
            });

            it.call(this, attrName + ' - state: пустая строка приводится к true', function() {
                this.xElement.setAttribute(attrName, '');
                expect(this.xElement.state[attrName]).to.equal(true);
            });

            it.call(this, attrName + ' - state: значение, равное названию, приводится к true', function() {
                this.xElement.setAttribute(attrName, attrName);
                expect(this.xElement.state[attrName]).to.equal(true);
            });

            it.call(this, attrName + ' - attrs: строка "true" не изменяет значения', function() {
                this.xElement.setAttribute(attrName, 'true');
                expect(this.xElement.attrs[attrName]).to.equal('true');
            });

            it.call(this, attrName + ' - attrs: строка "false" не изменяет значения', function() {
                this.xElement.setAttribute(attrName, 'false');
                expect(this.xElement.attrs[attrName]).to.equal('false');
            });

            it.call(this, attrName + ' - attrs: пустая строка не изменяет значения', function() {
                this.xElement.setAttribute(attrName, '');
                expect(this.xElement.attrs[attrName]).to.equal('');
            });

            it.call(this, attrName + ' - attrs: значение, равное названию, не изменяет значения', function() {
                this.xElement.setAttribute(attrName, attrName);
                expect(this.xElement.attrs[attrName]).to.equal(attrName);
            });
        }, this);
    });

    describe('атрибуты приводятся к типу, указанному в объекте propTypes вида ->', function() {
        it('значение "true" приводится к true в state и не меняется в attrs', function() {
            this.xElement.setAttribute('bool-attr', 'true');
            expect(this.xElement.getAttribute('bool-attr')).to.equal('true');
            expect(this.xElement.attrs['bool-attr']).to.equal('true');
            expect(this.xElement.state['bool-attr']).to.equal(true);
        });

        it('значение "false" приводится к false в state и не меняется в attrs', function() {
            this.xElement.setAttribute('bool-attr', 'false');
            expect(this.xElement.getAttribute('bool-attr')).to.equal('false');
            expect(this.xElement.attrs['bool-attr']).to.equal('false');
            expect(this.xElement.state['bool-attr']).to.equal(false);
        });

        it('пустая строка приводится к true в state и не меняется в attrs', function() {
            this.xElement.setAttribute('bool-attr', '');
            expect(this.xElement.getAttribute('bool-attr')).to.equal('');
            expect(this.xElement.attrs['bool-attr']).to.equal('');
            expect(this.xElement.state['bool-attr']).to.equal(true);
        });

        it('значение, равное названию, приводится к true в state и не меняется в attrs', function() {
            this.xElement.setAttribute('bool-attr', 'bool-attr');
            expect(this.xElement.getAttribute('bool-attr')).to.equal('bool-attr');
            expect(this.xElement.attrs['bool-attr']).to.equal('bool-attr');
            expect(this.xElement.state['bool-attr']).to.equal(true);
        });

        it('значение "on" или любое зругое, приводится к false в state и не меняется в attrs', function() {
            this.xElement.setAttribute('bool-attr', 'on');
            expect(this.xElement.getAttribute('bool-attr')).to.equal('on');
            expect(this.xElement.attrs['bool-attr']).to.equal('on');
            expect(this.xElement.state['bool-attr']).to.equal(false);
        });

        it('числовое значение приводится к числу в state и остаетя строкой в attrs', function() {
            this.xElement.setAttribute('number-attr', '100500');
            expect(this.xElement.getAttribute('number-attr')).to.equal('100500');
            expect(this.xElement.attrs['number-attr']).to.equal('100500');
            expect(this.xElement.state['number-attr']).to.equal(100500);
        });

        it('числовое значение приводится к числу в state и остаетя строкой в attrs (отрицательное значение)', function() {
            this.xElement.setAttribute('number-attr', '-100500');
            expect(this.xElement.getAttribute('number-attr')).to.equal('-100500');
            expect(this.xElement.attrs['number-attr']).to.equal('-100500');
            expect(this.xElement.state['number-attr']).to.equal(-100500);
        });

        it('числовое значение приводится к числу в state и остаетя строкой в attrs (дробное значение)', function() {
            this.xElement.setAttribute('number-attr', '100.500');
            expect(this.xElement.getAttribute('number-attr')).to.equal('100.500');
            expect(this.xElement.attrs['number-attr']).to.equal('100.500');
            expect(this.xElement.state['number-attr']).to.equal(100.5);
        });
    });

});
