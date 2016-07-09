HTML core custom elements

[![Build Status][build]][build-link] [![NPM version][version]][version-link] [![Dependency Status][dependency]][dependency-link] [![devDependency Status][dev-dependency]][dev-dependency-link] [![Code Climate][climate]][climate-link] [![Test Coverage][coverage]][coverage-link] [![Inline docs][inch]][inch-link]

## Documentation

[Documentation](http://xblocks.info) | [JSDoc](https://katochimoto.github.io/xblocks/docs/jsdoc/)

## Dependencies

- [React.js](https://github.com/facebook/react)
- [X-Tag core](https://github.com/x-tag/core) ([custom build xtag.js](https://github.com/Katochimoto/xblocks-core/blob/master/dist/xtag.js))
- [es5-shim](https://github.com/es-shims/es5-shim)

## Browser support

- Firefox 14+
- Internet Explorer 9+
- Chrome 4+
- Safari 4+
- Opera 12+

## Example ES6
```js
import React from 'react';
import { element } from 'xblocks-core';

@element('xb-element')
class XBElement extends React.Component {
    render() {
        return (
            <div title={this.props.title}>{this.context.content()}</div>
        );
    }
}

XBElement.propTypes = {
    title: React.PropTypes.string
};
```

## Example
```html
<!-- element usage -->
<xb-ico type="notification">8</xb-ico>
```

```js
// define element
import { create } from 'xblocks-core';

create('xb-ico');
```

```js
// define view
import { PropTypes } from 'react';
import { view } from 'xblocks-core';
import classnames from 'classnames';

view.register('xb-ico', {
    displayName: 'xb-ico',

    propTypes: {
        size: PropTypes.oneOf([ 's', 'm', 'l', 'xl' ]),
        type: PropTypes.oneOf([ 'remove', 'notification', 'check', 'dropdown' ]),
        active: PropTypes.bool,
        disabled: PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            size: 'm',
            children: String.fromCharCode(160)
        };
    },

    render: function() {
        const classes = classnames({
            'xb-ico': true,
            '_active': this.props.active,
            '_disabled': this.props.disabled,
            [ `_type-${this.props.type}` ]: Boolean(this.props.type),
            [ `_size-${this.props.size}` ]: Boolean(this.props.size)
        });

        return (
            <span className={classes}>{this.context.content()}</span>
        );
    }
});
```


## Install

```
npm install xblocks-core
```
```
bower install xblocks-core
```

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
[inch]: https://inch-ci.org/github/Katochimoto/xblocks-core.svg?branch=master
[inch-link]: https://inch-ci.org/github/Katochimoto/xblocks-core
