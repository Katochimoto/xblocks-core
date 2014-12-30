/* global describe, it, expect, xblocks, beforeEach, afterEach, vow */
/* jshint strict: false */

describe('xblocks - Изменение атрибутов ->', function() {

    xblocks.view.register('x-element-update', {
        propTypes: {
            'bool-attr': React.PropTypes.bool,
            'number-attr': React.PropTypes.number
        },

        render: function() {
            return React.DOM.div({
                className: (this.props['bool-attr'] ? 'bool' : '')
            });
        }
    });

    xblocks.create('x-element-update');


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
            that.xElement.addEventListener('xb-update', function() {
                expect(this.getAttribute('bool-attr')).to.be('true');
                expect(xblocks.dom.querySelector(this, '.bool')).not.to.be(null);
                resolve();
            }, false);

            that.xElement.addEventListener('xb-created', function() {
                expect(xblocks.dom.querySelector(this, '.bool')).to.be(null);
                that.xElement.setAttribute('bool-attr', 'true');
            }, false);

            document.body.appendChild(that.xElement);
        });
    });

});
