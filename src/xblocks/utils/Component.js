import React, { PropTypes } from 'react';
import clone from 'lodash/clone';
import get from 'lodash/get';
import global from '../../context';
import { getFactory } from '../view';
import Constants from '../constants';

/**
 * The basic component. Required for the formation of context.
 *
 * @example
 * import Component from 'xblocks-core/utils/Component';
 * React.render(Component({ property: 'test' }), node);
 *
 * @module xblocks-core/utils/Component
 * @returns {function}
 */
export default React.createFactory(React.createClass({
    /**
     * Types of context
     * @property {Object} childContextTypes
     * @property {HTMLElement} childContextTypes.container the node associated with the view
     * @property {function} childContextTypes.content
     */
    childContextTypes: {
        container: PropTypes.any,
        content: PropTypes.func
    },

    /**
     * The context value
     * @returns {{ container: HTMLElement, content: function }}}
     */
    getChildContext() {
        return {
            container: this.props._container,

            /**
             * Output function user content
             * @param {ReactElement} element
             * @returns {ReactElement}
             */
            content: (element) => (
                <ComponentContent {...{ element }}>
                    {this.props.children}
                </ComponentContent>
            )
        };
    },

    /**
     * @returns {ReactElement}
     */
    render() {
        const tagName = this.props._container[ Constants.TAGNAME ];
        const props = clone(this.props);

        delete props._container;

        return getFactory(tagName)(props);
    }
}));

/**
 * Item output custom content
 * @param {Object} props
 * @param {ReactElement} props.element
 * @param {string} props.children
 * @param {Object} context
 * @param {HTMLElement} context.container the node associated with the view
 * @returns {ReactElement}
 * @private
 */
const ComponentContent = function (props, context) {
    const isShadow = get(context.container, [ Constants.BLOCK, 'isShadow' ], false);

    if (isShadow) {
        if (global.HTMLSlotElement) {
            return <slot />;

        } else {
            return <content />;
        }
    }

    const elementProps = {
        'data-xb-content': context.container[ Constants.UID ],
        'dangerouslySetInnerHTML': { __html: props.children }
    };

    if (props.element) {
        return React.cloneElement(props.element, elementProps);

    } else {
        return <span {...elementProps} />;
    }
};

/**
 * Types of context
 * @property {Object} contextTypes
 * @property {HTMLElement} contextTypes.container the node associated with the view
 */
ComponentContent.contextTypes = {
    container: PropTypes.any
};
