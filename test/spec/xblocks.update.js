/* global describe, it, expect, xblocks, beforeEach, afterEach */
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

    });

    afterEach(function() {

    });

    it('Добавление атрибута вызывает перерисовку', function(done) {
        var xElement = document.createElement('x-element-update');

        xElement.addEventListener('xb-update', function() {
            expect(this.getAttribute('bool-attr')).to.be('true');
            expect(xblocks.dom.querySelector(this, '.bool')).not.to.be(null);
            done();
        }, false);

        xElement.addEventListener('xb-created', function() {
            expect(xblocks.dom.querySelector(this, '.bool')).to.be(null);
            xElement.setAttribute('bool-attr', 'true');
        }, false);

        document.body.appendChild(xElement);

    });

});
