/* global describe, it, expect, xblocks, beforeEach, afterEach */
/* jshint strict: false */

/*
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
        this.xElement = document.createElement('x-element-insert');
    });

    afterEach(function() {
        document.body.removeChild(this.xElement);
        delete this.xElement;
    });

    it('Инициализация xblocks выполняется после вставки в DOM', function(done) {
        this.xElement.addEventListener('xb-created', function() {
            expect(this.xblock).to.be.a(xblocks.element);
            expect(this.mounted).to.be(true);
            expect(this._inserted).to.be(true);
            expect(this.innerHTML.replace(/\sdata\-reactid=\"\.\d+\"/, '')).to.be('<div></div>');
            done();
        }, false);

        document.body.appendChild(this.xElement);
    });
});
*/
