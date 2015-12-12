# xblocks-core
> HTML core custom elements

[![Build Status][build]][build-link] [![NPM version][version]][version-link] [![Dependency Status][dependency]][dependency-link] [![devDependency Status][dev-dependency]][dev-dependency-link] [![Code Climate][climate]][climate-link] [![Test Coverage][coverage]][coverage-link]

##Dependencies

- [React.js](https://github.com/facebook/react) (0.14.3)
- [X-Tag core](https://github.com/x-tag/core) ([custom build xtag.js](https://github.com/Katochimoto/xblocks-core/blob/master/dist/xtag.js) or 1.0.0)
- [es5-shim](https://github.com/es-shims/es5-shim) (4.1.1)

##Browser support

- Firefox 14+
- Internet Explorer 9+
- Chrome 4+
- Safari 4+
- Opera 12+

##Example
```js
var xblocks = require('xblocks');
var classnames = require('classnames');

// define jsx view
xblocks.view.register('xb-ico', {
    displayName: 'xb-ico',

    propTypes: {
        'id': React.PropTypes.string,
        'class': React.PropTypes.string,
        'alt': React.PropTypes.string,
        'size': React.PropTypes.oneOf(['s', 'm', 'l', 'xl']),
        'type': React.PropTypes.oneOf(['remove', 'notification', 'check', 'dropdown']),
        'active': React.PropTypes.bool,
        'disabled': React.PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            'size': 'm',
            'children': String.fromCharCode(160)
        };
    },

    render: function() {
        var classes = {
            'xb-ico': true,
            '_active': this.props.active,
            '_disabled': this.props.disabled
        };

        if (this.props.type) {
            classes['_type-' + this.props.type] = true;
        }

        if (this.props.size) {
            classes['_size-' + this.props.size] = true;
        }

        classes = classnames(classes);

        return (
            <span className={classes}
                data-xb-content={this.props._uid}>{this.props.children}</span>
        );
    }
});
```

```js
// define element
xblocks.create('xb-ico');
```

```html
<!-- element usage -->
<xb-ico type="notification">8</xb-ico>
```


##Install

```
npm install xblocks-core
```
```
bower install xblocks-core
```

## Stats

[![NPM](https://nodei.co/npm/xblocks-core.png?downloads=true&stars=true)](https://nodei.co/npm/xblocks-core/)
[![NPM](https://nodei.co/npm-dl/xblocks-core.png)](https://nodei.co/npm/xblocks-core/)

[build]: https://travis-ci.org/Katochimoto/xblocks-core.svg?branch=master
[build-link]: https://travis-ci.org/Katochimoto/xblocks-core
[version]: https://badge.fury.io/js/xblocks-core.svg
[version-link]: http://badge.fury.io/js/xblocks-core
[dependency]: https://david-dm.org/Katochimoto/xblocks-core.svg
[dependency-link]: https://david-dm.org/Katochimoto/xblocks-core
[dev-dependency]: https://david-dm.org/Katochimoto/xblocks-core/dev-status.svg
[dev-dependency-link]: https://david-dm.org/Katochimoto/xblocks-core#info=devDependencies
[climate]: https://codeclimate.com/github/Katochimoto/xblocks-core/badges/gpa.svg
[climate-link]: https://codeclimate.com/github/Katochimoto/xblocks-core
[coverage]: https://codeclimate.com/github/Katochimoto/xblocks-core/badges/coverage.svg
[coverage-link]: https://codeclimate.com/github/Katochimoto/xblocks-core
