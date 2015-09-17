describe('xblocks - Создание ->', function() {

    beforeEach(function() {
        this.xElement = document.createElement('x-element-create');
    });

    it('свойство xtagName', function() {
        expect(this.xElement.xtagName).to.equal('x-element-create');
    });

    it('свойство xtmpl', function() {
        expect(this.xElement.xtmpl).to.be.an('object');
    });

    it('свойство xuid', function() {
        expect(this.xElement.xuid).to.be.a('number');
        expect(this.xElement.xuid).to.be.above(0);
    });

    it('свойство xprops', function() {
        expect(this.xElement.xprops).to.be.an('object');
        expect(this.xElement.xprops).to.have.keys([ '_uid', 'children' ]);
    });

    it('свойство mounted', function() {
        expect(this.xElement.mounted).to.be.a('boolean');
        expect(this.xElement.mounted).to.equal(false);
    });

    it('свойство content', function() {
        expect(this.xElement.content).to.be.a('string');
        expect(this.xElement.content).to.equal('');
    });

    it('свойство innerHTML', function() {
        expect(this.xElement.innerHTML).to.be.a('string');
        expect(this.xElement.innerHTML).to.equal('');
    });

    it('свойство outerHTML', function() {
        expect(this.xElement.outerHTML).to.be.a('string');
        expect(this.xElement.outerHTML).to.equal('<x-element-create></x-element-create>');
    });

    it('свойство attrs', function() {
        expect(this.xElement.attrs).to.be.an('object');
    });

    it('свойство state', function() {
        expect(this.xElement.props).to.be.an('object');
    });

    it('метод upgrade', function() {
        expect(this.xElement.upgrade).to.be.an('function');
    });

    it('метод cloneNode', function() {
        expect(this.xElement.cloneNode).to.be.an('function');
    });

    it('является потомком HTMLElement', function() {
        expect(this.xElement instanceof HTMLElement).to.be.ok;
    });

    it('свойство xblock отсутствует на момент создания элемента', function() {
        expect(this.xElement.xblock).to.be.a('undefined');
    });

    it('свойство xinserted', function() {
        expect(this.xElement.xinserted).to.be.a('boolean');
        expect(this.xElement.xinserted).to.equal(false);
    });
});
