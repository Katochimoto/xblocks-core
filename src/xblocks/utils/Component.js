import React, { PropTypes } from 'react';
import get from 'lodash/get';
import isPlainObject from 'lodash/isPlainObject';
import identity from 'lodash/identity';
import clone from 'lodash/clone';
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
    displayName: 'xb-component',

    /**
     * Types of context
     * @property {Object} childContextTypes
     * @property {HTMLElement} childContextTypes.container the node associated with the view
     * @property {function} childContextTypes.content
     * @property {function} childContextTypes.template
     * @property {function} childContextTypes.isEmptyContent check empty content
     */
    childContextTypes: {
        container: PropTypes.any,
        content: PropTypes.func,
        template: PropTypes.func,
        isEmptyContent: PropTypes.func
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
            ),

            /**
             * Create node by template.
             * @param {string} tmplName template name
             * @param {ReactElement} element
             * @param {function} [interceptor] custom conversion template
             * @returns {?ReactElement}
             */
            template: (tmplName, element, interceptor) => (
                <ComponentTemplate {...{ tmplName, element, interceptor }} />
            ),

            /**
             * Check empty content.
             * @returns {boolean}
             */
            isEmptyContent: () => {
                const isShadow = get(this.props._container, [ Constants.BLOCK, 'isShadow' ], false);

                if (isShadow) {
                    return !this.props._container.hasChildNodes();

                } else {
                    return !this.props.children;
                }
            }
        };
    },

    /**
     * @returns {ReactElement}
     */
    render() {
        const tagName = this.props._container[ Constants.TAGNAME ];
        const props = clone(this.props);

        delete props._container;
        props.ref = (ref) => this.userComponent = ref;

        return getFactory(tagName)(props);
    }
}));

/**
 * Item output custom content.
 * @param {Object} props
 * @param {ReactElement} [props.element]
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

/**
 * Item output custom template content.
 * @param {Object} props
 * @param {string} props.tmplName
 * @param {ReactElement} [props.element]
 * @param {function} [props.interceptor]
 * @param {Object} context
 * @param {HTMLElement} context.container the node associated with the view
 * @returns {ReactElement}
 * @private
 */
const ComponentTemplate = function (props, context) {
    const isShadow = get(context.container, [ Constants.BLOCK, 'isShadow' ], false);

    if (isShadow) {
        if (global.HTMLSlotElement) {
            return <slot name={props.tmplName} />;

        } else {
            return <content select={props.tmplName} />;
        }
    }

    const templates = context.container[ Constants.TMPL ];

    if (isPlainObject(templates) && templates.hasOwnProperty(props.tmplName)) {
        const interceptor = props.interceptor || identity;
        const elementProps = {
            'dangerouslySetInnerHTML': { __html: interceptor(templates[ props.tmplName ]) }
        };

        if (props.element) {
            return React.cloneElement(props.element, elementProps);

        } else {
            return <div {...elementProps} />;
        }
    }

    return null;
};

/**
 * Types of context
 * @property {Object} contextTypes
 * @property {HTMLElement} contextTypes.container the node associated with the view
 */
ComponentTemplate.contextTypes = {
    container: PropTypes.any
};
