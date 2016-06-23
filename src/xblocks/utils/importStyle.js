import has from 'lodash/has';
import set from 'lodash/set';
import isPlainObject from 'lodash/isPlainObject';
import isEmpty from 'lodash/isEmpty';
import forEach from 'lodash/forEach';
import Constants from '../constants';

export default function (node, inline) {
    if (!isPlainObject(inline) || isEmpty(inline)) {
        return;
    }

    const doc = node.ownerDocument;
    const root = node.shadowRoot || doc.head || doc.getElementsByTagName('head')[0];

    forEach(inline, function (css, uid) {
        if (!has(root, [ Constants.STYLE, uid ])) {
            set(root, [ Constants.STYLE, uid ], true);

            const style = doc.createElement('style');
            style.type = 'text/css';
            style.id = uid;

            if (style.styleSheet) {
                style.styleSheet.cssText = css;

            } else {
                style.appendChild(doc.createTextNode(css));
            }

            root.appendChild(style);
        }
    });
}
