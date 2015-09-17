var xblocks = require('../../src/xblocks.js');
var XBElement = require('../../src/xblocks/element');

describe('xblocks - Вставка в DOM ->', function() {

    beforeEach(function() {
        this.xElement = document.createElement('x-element-insert');
    });

    afterEach(function() {
        if (this.xElement.parentNode) {
            this.xElement.parentNode.removeChild(this.xElement);
        }
    });

    it('Инициализация xblocks выполняется после вставки в DOM', function() {
        var that = this;

        return new vow.Promise(function(resolve) {
            that.xElement.addEventListener('xb-created', function _onXbCreated() {
                that.xElement.removeEventListener('xb-created', _onXbCreated);

                //expect(this.xblock).to.be.an.instanceof(XBElement);
                expect(this.mounted).to.be.true;
                expect(this.xinserted).to.be.true;
                resolve();
            });

            document.body.appendChild(that.xElement);
        });
    });

    it('событие xb-created срабатывает для группы элементов на window', function() {
        var that = this;

        return new vow.Promise(function(resolve) {
            window.addEventListener('xb-created', function _onXbCreated(event) {
                window.removeEventListener('xb-created', _onXbCreated);

                expect(event.detail.records).to.be.a('array');
                resolve();
            });

            document.body.appendChild(that.xElement);
        });
    });

});
