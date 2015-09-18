require('../tags/x-element-clone.jsx');

describe('xblocks - клонирование ->', function() {

    beforeEach(function() {
        this.xElement = document.createElement('x-element-clone');
    });

    afterEach(function() {
        if (this.xElement.parentNode) {
            this.xElement.parentNode.removeChild(this.xElement);
        }
    });

    it('Клонированный элемент не инициализирован 1', function() {
        var that = this;

        return new vow.Promise(function(resolve) {
            that.xElement.addEventListener('xb-created', function _onXbCreated() {
                that.xElement.removeEventListener('xb-created', _onXbCreated);

                var cloneElement = this.cloneNode();

                expect(cloneElement.xblock).to.equal(undefined);
                resolve();
            });

            document.body.appendChild(that.xElement);
        });
    });

    it('Клонированный элемент не инициализирован 2', function() {
        var that = this;

        return new vow.Promise(function(resolve) {
            that.xElement.addEventListener('xb-created', function _onXbCreated() {
                that.xElement.removeEventListener('xb-created', _onXbCreated);

                var cloneElement = this.cloneNode();

                expect(cloneElement.mounted).to.equal(false);
                resolve();
            });

            document.body.appendChild(that.xElement);
        });
    });

    it('Клонированный элемент не инициализирован 3', function() {
        var that = this;

        return new vow.Promise(function(resolve) {
            that.xElement.addEventListener('xb-created', function _onXbCreated() {
                that.xElement.removeEventListener('xb-created', _onXbCreated);

                var cloneElement = this.cloneNode();

                expect(cloneElement.xinserted).to.equal(false);
                resolve();
            });

            document.body.appendChild(that.xElement);
        });
    });

    it('Клонированный элемент не инициализирован 4', function() {
        var that = this;

        return new vow.Promise(function(resolve) {
            that.xElement.addEventListener('xb-created', function _onXbCreated() {
                that.xElement.removeEventListener('xb-created', _onXbCreated);

                var cloneElement = this.cloneNode();

                expect(cloneElement.content).to.equal('');
                resolve();
            });

            document.body.appendChild(that.xElement);
        });
    });

});
