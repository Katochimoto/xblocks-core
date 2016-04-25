/**
 * @module xblocks/decorator
 */

import { create } from './block';
import { register } from './view';

/**
 * Decorating React.Component
 *
 * @example
 * var xcore = require('xblocks-core');
 *
 * @xcore.element('x-element')
 * class XElement extends React.Component {
 *     render() {
 *         return (
 *             <div data-xb-content={this.props._uid} title={this.props.test1}>{this.props.children}</div>
 *         );
 *     }
 * }
 *
 * XElement.propTypes = {
 *     test1: React.PropTypes.string
 * };
 *
 * @example
 * var xcore = require('xblocks-core');
 *
 * @xcore.element('x-element', {
 *     events: {
 *         'xb-created': function() {}
 *     }
 * })
 * class XElement extends React.Component {
 *     // ...
 * }
 *
 * @alias module:xblocks/decorator.element
 * @param {string} blockName the name of the new node
 * @param {?Object|array} options settings tag creation
 * @returns {function}
 */
export function element(blockName, options) {
    return function (component) {
        create(blockName, options);
        register(blockName, component);
    };
}
