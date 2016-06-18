require('../tags/x-element.jsx');
require('../tags/x-element-clone.jsx');
require('../tags/x-element-create.jsx');
require('../tags/x-element-insert.jsx');
require('../tags/x-element-update.jsx');

var vow = require('vow');
var XBElement = require('element').XBElement;
import Constants from 'constants';

describe('xblocks', function () {

    describe('работа с атрибутами', function () {
        beforeEach(function () {
            this.xElement = document.createElement('x-element');
        });

        afterEach(function () {
            delete this.xElement;
        });

        it('при добавлении атрибута, он должен быть доступен при вызове getAttribute', function () {
            this.xElement.setAttribute('test', '123');
            expect(this.xElement.getAttribute('test')).to.equal('123');
        });

        it('при добавлении атрибута, он должен быть доступен в свойстве attrs', function () {
            this.xElement.setAttribute('test', '123');
            expect(this.xElement.attrs['test']).to.equal('123');
        });

        it('при добавлении атрибута, он должен быть доступен в свойстве state', function () {
            this.xElement.setAttribute('test', '123');
            expect(this.xElement.props['test']).to.equal('123');
        });


        describe('приведение к типу boolean атрибутов ->', function () {
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
            ].forEach(function (attrName) {
                it.call(this, attrName + 'checked - state: строка "true" приводится к true', function () {
                    this.xElement.setAttribute(attrName, 'true');
                    expect(this.xElement.props[attrName]).to.equal(true);
                });

                it.call(this, attrName + ' - state: строка "false" приводится к false', function () {
                    this.xElement.setAttribute(attrName, 'false');
                    expect(this.xElement.props[attrName]).to.equal(false);
                });

                it.call(this, attrName + ' - state: пустая строка приводится к true', function () {
                    this.xElement.setAttribute(attrName, '');
                    expect(this.xElement.props[attrName]).to.equal(true);
                });

                it.call(this, attrName + ' - state: значение, равное названию, приводится к true', function () {
                    this.xElement.setAttribute(attrName, attrName);
                    expect(this.xElement.props[attrName]).to.equal(true);
                });

                it.call(this, attrName + ' - attrs: строка "true" не изменяет значения', function () {
                    this.xElement.setAttribute(attrName, 'true');
                    expect(this.xElement.attrs[attrName]).to.equal('true');
                });

                it.call(this, attrName + ' - attrs: строка "false" не изменяет значения', function () {
                    this.xElement.setAttribute(attrName, 'false');
                    expect(this.xElement.attrs[attrName]).to.equal('false');
                });

                it.call(this, attrName + ' - attrs: пустая строка не изменяет значения', function () {
                    this.xElement.setAttribute(attrName, '');
                    expect(this.xElement.attrs[attrName]).to.equal('');
                });

                it.call(this, attrName + ' - attrs: значение, равное названию, не изменяет значения', function () {
                    this.xElement.setAttribute(attrName, attrName);
                    expect(this.xElement.attrs[attrName]).to.equal(attrName);
                });
            }, this);
        });

        describe('атрибуты приводятся к типу, указанному в объекте propTypes вида ->', function () {
            it('значение "true" приводится к true в state и не меняется в attrs', function () {
                this.xElement.setAttribute('bool-attr', 'true');
                expect(this.xElement.getAttribute('bool-attr')).to.equal('true');
                expect(this.xElement.attrs['bool-attr']).to.equal('true');
                expect(this.xElement.props['bool-attr']).to.equal(true);
            });

            it('значение "false" приводится к false в state и не меняется в attrs', function () {
                this.xElement.setAttribute('bool-attr', 'false');
                expect(this.xElement.getAttribute('bool-attr')).to.equal('false');
                expect(this.xElement.attrs['bool-attr']).to.equal('false');
                expect(this.xElement.props['bool-attr']).to.equal(false);
            });

            it('пустая строка приводится к true в state и не меняется в attrs', function () {
                this.xElement.setAttribute('bool-attr', '');
                expect(this.xElement.getAttribute('bool-attr')).to.equal('');
                expect(this.xElement.attrs['bool-attr']).to.equal('');
                expect(this.xElement.props['bool-attr']).to.equal(true);
            });

            it('значение, равное названию, приводится к true в state и не меняется в attrs', function () {
                this.xElement.setAttribute('bool-attr', 'bool-attr');
                expect(this.xElement.getAttribute('bool-attr')).to.equal('bool-attr');
                expect(this.xElement.attrs['bool-attr']).to.equal('bool-attr');
                expect(this.xElement.props['bool-attr']).to.equal(true);
            });

            it('значение "on" или любое зругое, приводится к false в state и не меняется в attrs', function () {
                this.xElement.setAttribute('bool-attr', 'on');
                expect(this.xElement.getAttribute('bool-attr')).to.equal('on');
                expect(this.xElement.attrs['bool-attr']).to.equal('on');
                expect(this.xElement.props['bool-attr']).to.equal(false);
            });

            it('числовое значение приводится к числу в state и остаетя строкой в attrs', function () {
                this.xElement.setAttribute('number-attr', '100500');
                expect(this.xElement.getAttribute('number-attr')).to.equal('100500');
                expect(this.xElement.attrs['number-attr']).to.equal('100500');
                expect(this.xElement.props['number-attr']).to.equal(100500);
            });

            it('числовое значение приводится к числу в state и остаетя строкой в attrs (отрицательное значение)', function () {
                this.xElement.setAttribute('number-attr', '-100500');
                expect(this.xElement.getAttribute('number-attr')).to.equal('-100500');
                expect(this.xElement.attrs['number-attr']).to.equal('-100500');
                expect(this.xElement.props['number-attr']).to.equal(-100500);
            });

            it('числовое значение приводится к числу в state и остаетя строкой в attrs (дробное значение)', function () {
                this.xElement.setAttribute('number-attr', '100.500');
                expect(this.xElement.getAttribute('number-attr')).to.equal('100.500');
                expect(this.xElement.attrs['number-attr']).to.equal('100.500');
                expect(this.xElement.props['number-attr']).to.equal(100.5);
            });
        });
    });

    describe('клонирование', function () {
        beforeEach(function () {
            this.xElement = document.createElement('x-element-clone');
        });

        afterEach(function () {
            if (this.xElement.parentNode) {
                this.xElement.parentNode.removeChild(this.xElement);
            }
        });

        it('Клонированный элемент не инициализирован 1', function () {
            var that = this;

            return new vow.Promise(function (resolve) {
                that.xElement.addEventListener('xb-created', function _onXbCreated() {
                    this.removeEventListener('xb-created', _onXbCreated);

                    var cloneElement = this.cloneNode();

                    expect(cloneElement.xblock).to.equal(undefined);
                    resolve();
                });

                document.body.appendChild(that.xElement);
            });
        });

        it('Клонированный элемент не инициализирован 2', function () {
            var that = this;

            return new vow.Promise(function (resolve) {
                that.xElement.addEventListener('xb-created', function _onXbCreated() {
                    this.removeEventListener('xb-created', _onXbCreated);

                    var cloneElement = this.cloneNode();

                    expect(cloneElement.mounted).to.equal(false);
                    resolve();
                });

                document.body.appendChild(that.xElement);
            });
        });

        it('Клонированный элемент не инициализирован 3', function () {
            var that = this;

            return new vow.Promise(function (resolve) {
                that.xElement.addEventListener('xb-created', function _onXbCreated() {
                    this.removeEventListener('xb-created', _onXbCreated);

                    var cloneElement = this.cloneNode();

                    expect(cloneElement[ Constants.INSERTED ]).to.equal(false);
                    resolve();
                });

                document.body.appendChild(that.xElement);
            });
        });

        it('Клонированный элемент не инициализирован 4', function () {
            var that = this;

            return new vow.Promise(function (resolve) {
                that.xElement.addEventListener('xb-created', function _onXbCreated() {
                    this.removeEventListener('xb-created', _onXbCreated);

                    var cloneElement = this.cloneNode();

                    expect(cloneElement.content).to.equal('');
                    resolve();
                });

                document.body.appendChild(that.xElement);
            });
        });
    });

    describe('создание', function () {
        beforeEach(function () {
            this.xElement = document.createElement('x-element-create');
        });

        it('свойство xtagName', function () {
            expect(this.xElement.xtagName).to.equal('x-element-create');
        });

        it('свойство xtmpl', function () {
            expect(this.xElement[ Constants.TMPL ]).to.be.an('object');
        });

        it('свойство xuid', function () {
            expect(this.xElement.xuid).to.be.a('string');
            expect(this.xElement.xuid).to.be.above(0);
        });

        it('свойство xprops', function () {
            expect(this.xElement.xprops).to.be.an('object');
            expect(this.xElement.xprops).to.contain.all.keys([ '_uid', 'children' ]);
        });

        it('свойство mounted', function () {
            expect(this.xElement.mounted).to.be.a('boolean');
            expect(this.xElement.mounted).to.equal(false);
        });

        it('свойство content', function () {
            expect(this.xElement.content).to.be.a('string');
            expect(this.xElement.content).to.equal('');
        });

        it('свойство innerHTML', function () {
            expect(this.xElement.innerHTML).to.be.a('string');
            expect(this.xElement.innerHTML).to.equal('');
        });

        it('свойство outerHTML', function () {
            expect(this.xElement.outerHTML).to.be.a('string');
            expect(this.xElement.outerHTML).to.equal('<x-element-create></x-element-create>');
        });

        it('свойство attrs', function () {
            expect(this.xElement.attrs).to.be.an('object');
        });

        it('свойство state', function () {
            expect(this.xElement.props).to.be.an('object');
        });

        it('метод upgrade', function () {
            expect(this.xElement.upgrade).to.be.an('function');
        });

        it('метод cloneNode', function () {
            expect(this.xElement.cloneNode).to.be.an('function');
        });

        it('является потомком HTMLElement', function () {
            expect(this.xElement instanceof HTMLElement).to.be.ok;
        });

        it('свойство xblock отсутствует на момент создания элемента', function () {
            expect(this.xElement[ Constants.BLOCK ]).to.be.a('undefined');
        });

        it('свойство xinserted', function () {
            expect(this.xElement[ Constants.INSERTED ]).to.be.a('boolean');
            expect(this.xElement[ Constants.INSERTED ]).to.equal(false);
        });
    });

    describe('вставка в DOM', function () {
        beforeEach(function () {
            this.xElement = document.createElement('x-element-insert');
        });

        afterEach(function () {
            if (this.xElement.parentNode) {
                this.xElement.parentNode.removeChild(this.xElement);
            }
        });

        it('Инициализация xblocks выполняется после вставки в DOM', function () {
            var that = this;

            return new vow.Promise(function (resolve) {
                that.xElement.addEventListener('xb-created', function _onXbCreated() {
                    this.removeEventListener('xb-created', _onXbCreated);

                    expect(this[ Constants.BLOCK ]).to.be.an.instanceof(XBElement);
                    expect(this.mounted).to.be.true;
                    expect(this[ Constants.INSERTED ]).to.be.true;
                    resolve();
                });

                document.body.appendChild(that.xElement);
            });
        });

        it('событие xb-created срабатывает для группы элементов на window', function () {
            var that = this;

            return new vow.Promise(function (resolve) {
                window.addEventListener('xb-created', function _onXbCreated(event) {
                    window.removeEventListener('xb-created', _onXbCreated);

                    expect(event.detail.records).to.be.a('array');
                    resolve();
                });

                document.body.appendChild(that.xElement);
            });
        });
    });

    describe('изменение атрибутов', function () {
        beforeEach(function () {
            this.xElement = document.createElement('x-element-update');
        });

        afterEach(function () {
            if (this.xElement.parentNode) {
                this.xElement.parentNode.removeChild(this.xElement);
            }
        });

        it('Добавление атрибута вызывает перерисовку', function () {
            var that = this;

            return new vow.Promise(function (resolve) {
                that.xElement.addEventListener('xb-update', function _onXbUpdate() {
                    this.removeEventListener('xb-update', _onXbUpdate);

                    expect(this.getAttribute('bool-attr')).to.equal('true');
                    expect(this.querySelector('.bool')).to.not.equal(null);
                    resolve();
                });

                that.xElement.addEventListener('xb-created', function _onXbCreated() {
                    this.removeEventListener('xb-created', _onXbCreated);

                    expect(this.querySelector('.bool')).to.equal(null);
                    that.xElement.setAttribute('bool-attr', 'true');
                });

                document.body.appendChild(that.xElement);
            });
        });
    });
});
