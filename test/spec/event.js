import { forwardingEvents, dispatch } from 'event';

describe('#forwardingEvents', function () {
    it('Должно пробросить событие', function () {
        var nodeFrom = document.body.appendChild(document.createElement('div'));
        var nodeTo = document.body.appendChild(document.createElement('div'));

        forwardingEvents('test', nodeFrom, nodeTo);

        var spy = this.sinon.spy();
        nodeTo.addEventListener('test', spy, false);
        dispatch(nodeFrom, 'test');

        expect(spy).to.be.calledOnce;
    });

    it('Возвращается колбек с методом отмены подписки', function () {
        var nodeFrom = document.body.appendChild(document.createElement('div'));
        var nodeTo = document.body.appendChild(document.createElement('div'));

        var callback = forwardingEvents('test', nodeFrom, nodeTo);
        callback.cancel();

        var spy = this.sinon.spy();
        nodeTo.addEventListener('test', spy, false);
        dispatch(nodeFrom, 'test');

        expect(spy.callCount).to.be.equal(0);
    });
});
