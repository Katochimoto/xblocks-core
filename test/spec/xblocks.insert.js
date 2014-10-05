/* global describe, it, expect, xblocks, beforeEach, afterEach */
/* jshint strict: false */

describe('xblocks - Вставка в DOM', function() {

    xblocks.view.register('x-element-insert', {
        propTypes: {
            'bool-attr': React.PropTypes.bool,
            'number-attr': React.PropTypes.number
        },

        render: function() {
            return React.DOM.div({});
        }
    });

    xblocks.create('x-element-insert');


    beforeEach(function() {

    });

    afterEach(function() {

    });

    it('Инициализация xblocks выполняется после вставки в DOM', function(done) {
        var xElement = document.createElement('x-element-insert');
        xElement.addEventListener('xb-created', function() {
            expect(this.xblock).to.be.a(xblocks.element);
            expect(this.mounted).to.be(true);
            expect(this._inserted).to.be(true);
            document.body.removeChild(xElement);
            done();
        }, false);

        document.body.appendChild(xElement);
    });

    it('событие xb-created срабатывает для группы элементов на window', function(done) {
        var e1 = document.createElement('x-element-insert');
        var e2 = document.createElement('x-element-insert');

        window.addEventListener('xb-created', function onXbCreated(event) {
            if (event.detail.records.length === 2 &&
                event.detail.records[0] === e1 &&
                event.detail.records[1] === e2) {

                window.removeEventListener('xb-created', onXbCreated, false);
                document.body.removeChild(e1);
                document.body.removeChild(e2);
                done();
            }
        }, false);

        document.body.appendChild(e1);
        document.body.appendChild(e2);
    });

});
