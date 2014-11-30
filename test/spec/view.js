/* global describe, it, expect, xblocks, beforeEach, afterEach */
/* jshint strict: false */

xdescribe('xblocks.view', function() {
    describe('.template', function() {
        xblocks.view.register('x-element-view-template', {
            render: function() {
                return React.DOM.div({});
            }
        });

        xblocks.create('x-element-view-template');

        it('Шаблоны в теге script доступны во вьюхе через функцию template', function(done) {
            var xElement = document.createElement('x-element-view-template');

            xElement.addEventListener('xb-created', function() {
                console.log(this);
                document.body.removeChild(xElement);
                done();
            }, false);

            document.body.appendChild(xElement);
        });

    });
});
