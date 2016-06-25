import React, { PropTypes } from 'react';
import clone from 'lodash/clone';
import get from 'lodash/get';
import global from '../../context';
import { getFactory } from '../view';
import Constants from '../constants';

export default React.createFactory(React.createClass({
    childContextTypes: {
        container: PropTypes.any,
        content: PropTypes.func
    },

    getChildContext() {
        return {
            container: this.props._container,
            content: (element) => (
                <ComponentContent {...{ element }}>
                    {this.props.children}
                </ComponentContent>
            )
        };
    },

    render() {
        const tagName = this.props._container[ Constants.TAGNAME ];
        const props = clone(this.props);

        delete props._container;

        return getFactory(tagName)(props);
    }
}));

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

ComponentContent.contextTypes = {
    container: PropTypes.any
};
