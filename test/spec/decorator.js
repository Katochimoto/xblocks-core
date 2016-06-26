import { element } from 'decorator';
import React from 'react';

describe('xblocks.decorator', function () {
    it('Должен создать вид и элемент', function () {
        var constructor = element('xb-decorator-test', {
            accessors: {
                test: {
                    get: function () {
                        return '123';
                    }
                }
            }
        });

        var view = React.createClass({
            contextTypes: {
                content: React.PropTypes.func
            },

            render: function () {
                return (
                    <div>
                        {this.context.content()}
                    </div>
                );
            }
        });

        constructor(view);

        var node = document.createElement('xb-decorator-test');
        node.innerHTML = 'test';

        return new vow.Promise(function (resolve) {
            node.addEventListener('xb-created', function _onXbCreated() {
                this.removeEventListener('xb-created', _onXbCreated);

                expect(this.test).to.be.equal('123');
                expect(this.content).to.be.equal('test');

                this.parentNode.removeChild(this);
                resolve();
            });

            document.body.appendChild(node);
        });
    });
});
