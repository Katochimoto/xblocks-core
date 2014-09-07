/* global describe, it, expect, xblocks, sinon, beforeEach */
/* jshint strict: false */

describe('xblocks', function() {

    xblocks.view.register('x-element', {
        propTypes: {
            'bool-attr': React.PropTypes.bool
        },

        render: function() {
            return null;
        }
    });

    xblocks.create('x-element');

    beforeEach(function () {
        this.xElement = document.createElement('x-element');
    });

    afterEach(function() {
        delete this.xElement;
    });

    describe('Создание', function() {

        it('свойство xtagName', function() {
            expect(this.xElement.xtagName).to.be('x-element');
        });

        it('свойство xtmpl', function() {
            expect(this.xElement.xtmpl).to.be.an('object');
        });

        it('свойство xuid', function() {
            expect(this.xElement.xuid).to.be.a('number');
            expect(this.xElement.xuid).to.be.above(0);
        });

        it('свойство xprops', function() {
            expect(this.xElement.xprops).to.be.an('object');
            expect(this.xElement.xprops).to.have.keys([ '_uid', 'children', 'xb-static' ]);
        });

        it('свойство mounted', function() {
            expect(this.xElement.mounted).to.be.a('boolean');
            expect(this.xElement.mounted).to.be(false);
        });

        it('свойство content', function() {
            expect(this.xElement.content).to.be.a('string');
            expect(this.xElement.content).to.be('');
        });

        it('свойство innerHTML', function() {
            expect(this.xElement.innerHTML).to.be.a('string');
            expect(this.xElement.innerHTML).to.be('');
        });

        it('свойство outerHTML', function() {
            expect(this.xElement.outerHTML).to.be.a('string');
            expect(this.xElement.outerHTML).to.be('<x-element></x-element>');
        });

        it('свойство attrs', function() {
            expect(this.xElement.attrs).to.be.an('object');
        });

        it('свойство state', function() {
            expect(this.xElement.state).to.be.an('object');
        });

        it('метод upgrade', function() {
            expect(this.xElement.upgrade).to.be.an('function');
        });

        it('метод cloneNode', function() {
            expect(this.xElement.cloneNode).to.be.an('function');
        });

        it('является потомком HTMLElement', function() {
            expect(this.xElement instanceof HTMLElement).to.be.ok();
        });

        it('свойство xblock отсутствует на момент создания элемента', function() {
            expect(this.xElement.xblock).to.be.a('undefined');
        });

        it('свойство _inserted', function() {
            expect(this.xElement._inserted).to.be.a('boolean');
            expect(this.xElement._inserted).to.be(false);
        });
    });

    describe('Работа с атрибутами', function() {
        it('при добавлении атрибута, он должен быть доступен при вызове getAttribute', function() {
            this.xElement.setAttribute('test', '123');
            expect(this.xElement.getAttribute('test')).to.be('123');
        });

        it('при добавлении атрибута, он должен быть доступен в свойстве attrs', function() {
            this.xElement.setAttribute('test', '123');
            expect(this.xElement.attrs['test']).to.be('123');
        });

        it('при добавлении атрибута, он должен быть доступен в свойстве state', function() {
            this.xElement.setAttribute('test', '123');
            expect(this.xElement.state['test']).to.be('123');
        });

        xblocks.dom.attrs.ARRTS_BOOLEAN.forEach(function(attrName) {
            describe('boolean атрибут "' + attrName + '" приводится к типу в объекте state', function() {
                it('state: строка "true" приводится к true', function() {
                    this.xElement.setAttribute(attrName, 'true');
                    expect(this.xElement.state[attrName]).to.be(true);
                });

                it('state: строка "false" приводится к false', function() {
                    this.xElement.setAttribute(attrName, 'false');
                    expect(this.xElement.state[attrName]).to.be(false);
                });

                it('state: пустая строка приводится к true', function() {
                    this.xElement.setAttribute(attrName, '');
                    expect(this.xElement.state[attrName]).to.be(true);
                });

                it('state: значение, равное названию, приводится к true', function() {
                    this.xElement.setAttribute(attrName, attrName);
                    expect(this.xElement.state[attrName]).to.be(true);
                });

                it('attrs: строка "true" не изменяет значения', function() {
                    this.xElement.setAttribute(attrName, 'true');
                    expect(this.xElement.attrs[attrName]).to.be('true');
                });

                it('attrs: строка "false" не изменяет значения', function() {
                    this.xElement.setAttribute(attrName, 'false');
                    expect(this.xElement.attrs[attrName]).to.be('false');
                });

                it('attrs: пустая строка не изменяет значения', function() {
                    this.xElement.setAttribute(attrName, '');
                    expect(this.xElement.attrs[attrName]).to.be('');
                });

                it('attrs: значение, равное названию, не изменяет значения', function() {
                    this.xElement.setAttribute(attrName, attrName);
                    expect(this.xElement.attrs[attrName]).to.be(attrName);
                });
            });
        });

        describe('атрибуты приводятся к типу, указанному в объекте propTypes вида', function() {
            it('значение "true" приводится к true в state и не меняется в attrs', function() {
                this.xElement.setAttribute('bool-attr', 'true');
                expect(this.xElement.getAttribute('bool-attr')).to.be('true');
                expect(this.xElement.attrs['bool-attr']).to.be('true');
                expect(this.xElement.state['bool-attr']).to.be(true);
            });

            it('значение "false" приводится к false в state и не меняется в attrs', function() {
                this.xElement.setAttribute('bool-attr', 'false');
                expect(this.xElement.getAttribute('bool-attr')).to.be('false');
                expect(this.xElement.attrs['bool-attr']).to.be('false');
                expect(this.xElement.state['bool-attr']).to.be(false);
            });

            it('пустая строка приводится к true в state и не меняется в attrs', function() {
                this.xElement.setAttribute('bool-attr', '');
                expect(this.xElement.getAttribute('bool-attr')).to.be('');
                expect(this.xElement.attrs['bool-attr']).to.be('');
                expect(this.xElement.state['bool-attr']).to.be(true);
            });

            it('значение, равное названию, приводится к true в state и не меняется в attrs', function() {
                this.xElement.setAttribute('bool-attr', 'bool-attr');
                expect(this.xElement.getAttribute('bool-attr')).to.be('bool-attr');
                expect(this.xElement.attrs['bool-attr']).to.be('bool-attr');
                expect(this.xElement.state['bool-attr']).to.be(true);
            });

            it('значение "on" или любое зругое, приводится к false в state и не меняется в attrs', function() {
                this.xElement.setAttribute('bool-attr', 'on');
                expect(this.xElement.getAttribute('bool-attr')).to.be('on');
                expect(this.xElement.attrs['bool-attr']).to.be('on');
                expect(this.xElement.state['bool-attr']).to.be(false);
            });
        });

    });

    describe('Вставка в DOM', function() {



    });

    describe('Удаление из DOM', function() {

    });

    describe('Клонирование', function() {

    });



    describe('Изменение содержимого', function() {

    });



});
