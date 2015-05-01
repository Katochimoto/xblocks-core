/* global describe, it, expect, xblocks, beforeEach, afterEach, vow */
/* jshint strict: false */

describe('xblocks - Изменение атрибутов ->', function() {

    beforeEach(function() {
        this.xElement = document.createElement('x-element-update');
    });

    afterEach(function() {
        if (this.xElement.parentNode) {
            this.xElement.parentNode.removeChild(this.xElement);
        }
    });

    it('Добавление атрибута вызывает перерисовку', function() {
        var that = this;

        return new vow.Promise(function(resolve) {
            that.xElement.addEventListener('xb-update', function _onXbUpdate() {
                that.xElement.removeEventListener('xb-update', _onXbUpdate);

                expect(this.getAttribute('bool-attr')).to.be('true');
                expect(this.querySelector('.bool')).not.to.be(null);
                resolve();
            });

            that.xElement.addEventListener('xb-created', function _onXbCreated() {
                that.xElement.removeEventListener('xb-created', _onXbCreated);

                expect(this.querySelector('.bool')).to.be(null);
                that.xElement.setAttribute('bool-attr', 'true');
            });

            document.body.appendChild(that.xElement);
        });
    });

});
