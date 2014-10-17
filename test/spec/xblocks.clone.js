/* global describe, it, expect, xblocks, beforeEach, afterEach */
/* jshint strict: false */

describe('xblocks - клонирование', function() {

    xblocks.view.register('x-element-clone', {
        render: function() {
            return React.DOM.div({});
        }
    });

    xblocks.create('x-element-clone');

    beforeEach(function() {
        this.xElement = document.createElement('x-element-clone');
    });

    afterEach(function() {
        document.body.removeChild(this.xElement);
        delete this.xElement;
    });

    it('Клонированный элемент не инициализирован', function(done) {
        this.xElement.addEventListener('xb-created', function() {
            var cloneElement = this.cloneNode();

            expect(cloneElement.xblock).to.be(undefined);
            expect(cloneElement.mounted).to.be(false);
            expect(cloneElement._xinserted).to.be(false);
            expect(cloneElement.content).to.be('');
            done();
        }, false);

        document.body.appendChild(this.xElement);
    });

});
