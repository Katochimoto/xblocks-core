require('../tags/x-element-view-template.jsx');
var vow = require('vow');
var createBlock = require('block').create;
var create = require('view').create;
var register = require('view').register;
var React = require('react');

describe('xblocks.view', function () {

    describe('#template', function () {
        beforeEach(function () {
            this.xElement = document.createElement('x-element-view-template');
        });

        afterEach(function () {
            if (this.xElement.parentNode) {
                this.xElement.parentNode.removeChild(this.xElement);
            }
        });

        it('шаблоны в теге script доступны во вьюхе через функцию template', function () {
            this.xElement.innerHTML = '<script type="text/x-template" ref="test"><div class="test">test</div></script>';

            var that = this;
            return new vow.Promise(function (resolve) {
                that.xElement.addEventListener('xb-created', function _onXbCreated() {
                    this.removeEventListener('xb-created', _onXbCreated);
                    expect(this.querySelector('.test')).not.to.be.null;
                    resolve();
                });

                document.body.appendChild(that.xElement);
            });
        });
    });

    describe('#create', function () {
        it('Переопределение render должно вызвать исключение', function () {
            expect(function () {
                create([
                    {
                        render: function () {}
                    },
                    {
                        render: function () {}
                    }
                ]);

            }).to.throw(Error);
        });

        it('Переопределение displayName должно вызвать исключение', function () {
            expect(function () {
                create([
                    {
                        displayName: 'test'
                    },
                    {
                        displayName: 'test'
                    }
                ]);

            }).to.throw(Error);
        });

        it('Переопределение statics методов должно вызвать исключение', function () {
            expect(function () {
                create([
                    {
                        statics: {
                            test: function () {}
                        }
                    },
                    {
                        statics: {
                            test: function () {}
                        }
                    }
                ]);

            }).to.throw(Error);
        });

        it('Переопределение пользовательских методов должно вызвать исключение', function () {
            expect(function () {
                create([
                    {
                        test: function () {}
                    },
                    {
                        test: function () {}
                    }
                ]);

            }).to.throw(Error);
        });

        it('Миксины объединяются в один массив', function () {
            this.sinon.stub(React, 'createClass');

            create([
                {
                    mixins: [ {} ]
                },
                {
                    mixins: [ {} ]
                }
            ]);

            var spyCall = React.createClass.getCall(0);
            expect(spyCall.args[0].mixins).to.be.eql([ {}, {} ]);
        });

        it('Результаты getInitialState мержаться в один объект', function () {
            this.sinon.stub(React, 'createClass');

            create([
                {
                    getInitialState: function () {
                        return { a: 1 };
                    }
                },
                {
                    getInitialState: function () {
                        return { b: 2 };
                    }
                }
            ]);

            var spyCall = React.createClass.getCall(0);
            expect(spyCall.args[0].getInitialState()).to.be.eql({ a: 1, b: 2 });
        });

        it('Результаты getDefaultProps мержаться в один объект', function () {
            this.sinon.stub(React, 'createClass');

            create([
                {
                    getDefaultProps: function () {
                        return { a: 1 };
                    }
                },
                {
                    getDefaultProps: function () {
                        return { b: 2 };
                    }
                }
            ]);

            var spyCall = React.createClass.getCall(0);
            expect(spyCall.args[0].getDefaultProps()).to.be.eql({ a: 1, b: 2 });
        });

        it('Результаты shouldComponentUpdate объединяются по логическому или (1)', function () {
            this.sinon.stub(React, 'createClass');

            create([
                {
                    shouldComponentUpdate: function () {
                        return true;
                    }
                },
                {
                    shouldComponentUpdate: function () {
                        return false;
                    }
                }
            ]);

            var spyCall = React.createClass.getCall(0);
            expect(spyCall.args[0].shouldComponentUpdate()).to.be.ok;
        });

        it('Результаты shouldComponentUpdate объединяются по логическому или (2)', function () {
            this.sinon.stub(React, 'createClass');

            create([
                {
                    shouldComponentUpdate: function () {
                        return false;
                    }
                },
                {
                    shouldComponentUpdate: function () {
                        return false;
                    }
                }
            ]);

            var spyCall = React.createClass.getCall(0);
            expect(spyCall.args[0].shouldComponentUpdate()).to.not.be.ok;
        });

        it('Событие componentWillReceiveProps наследуется', function () {
            var spy1 = this.sinon.spy();
            var spy11 = this.sinon.spy();
            this.sinon.stub(React, 'createClass');

            create([
                {
                    componentWillReceiveProps: spy1
                },
                {
                    componentWillReceiveProps: spy11
                }
            ]);

            var spyCall = React.createClass.getCall(0);
            spyCall.args[0].componentWillReceiveProps();

            expect(spy11.calledAfter(spy1)).to.be.ok;
        });

        describe('Наследование событий', function () {
            it('События жизненного цикла (lifecycle) можно наследовать', function () {
                var spy1 = this.sinon.spy();
                var spy2 = this.sinon.spy();
                var spy3 = this.sinon.spy();
                var spy11 = this.sinon.spy();
                var spy22 = this.sinon.spy();
                var spy33 = this.sinon.spy();

                register('xb-view-test1', [
                    {
                        componentWillMount: spy1,
                        componentDidMount: spy2,
                        componentWillUnmount: spy3
                    },
                    {
                        componentWillMount: spy11,
                        componentDidMount: spy22,
                        componentWillUnmount: spy33,
                        render: function () {
                            return (
                                <div />
                            );
                        }
                    }
                ]);

                createBlock('xb-view-test1');

                var node = document.createElement('xb-view-test1');
                return new vow.Promise(function (resolve) {
                    node.addEventListener('xb-created', function _onXbCreated() {
                        this.removeEventListener('xb-created', _onXbCreated);

                        this.addEventListener('xb-destroy', function _onXbDestroy() {
                            this.removeEventListener('xb-destroy', _onXbDestroy);

                            expect(spy11.calledAfter(spy1)).to.be.ok;
                            expect(spy22.calledAfter(spy2)).to.be.ok;
                            expect(spy33.calledAfter(spy3)).to.be.ok;
                            resolve();
                        });

                        this.parentNode.removeChild(this);
                    });

                    document.body.appendChild(node);
                });
            });
        });
    });
});
