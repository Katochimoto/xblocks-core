/* global describe, it, expect, xblocks, beforeEach, afterEach */
/* jshint strict: false */

describe('xblocks - клонирование ->', function() {

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

    it('Клонированный элемент не инициализирован 1', function(done) {
        this.xElement.addEventListener('xb-created', function() {
            var cloneElement = this.cloneNode();

            expect(cloneElement.xblock).to.be(undefined);
            done();
        }, false);

        document.body.appendChild(this.xElement);
    });

    it('Клонированный элемент не инициализирован 2', function(done) {
        this.xElement.addEventListener('xb-created', function() {
            var cloneElement = this.cloneNode();

            expect(cloneElement.mounted).to.be(false);
            done();
        }, false);

        document.body.appendChild(this.xElement);
    });

    it('Клонированный элемент не инициализирован 3', function(done) {
        this.xElement.addEventListener('xb-created', function() {
            var cloneElement = this.cloneNode();

            expect(cloneElement.xinserted).to.be(false);
            done();
        }, false);

        document.body.appendChild(this.xElement);
    });

    it('Клонированный элемент не инициализирован 4', function(done) {
        this.xElement.addEventListener('xb-created', function() {
            var cloneElement = this.cloneNode();

            expect(cloneElement.content).to.be('');
            done();
        }, false);

        document.body.appendChild(this.xElement);
    });

});
