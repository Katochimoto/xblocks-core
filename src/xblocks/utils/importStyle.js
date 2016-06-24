import has from 'lodash/has';
import set from 'lodash/set';
import isPlainObject from 'lodash/isPlainObject';
import isEmpty from 'lodash/isEmpty';
import forEach from 'lodash/forEach';
import Constants from '../constants';

/**
 * Importing styles into a document or a shadow root.
 *
 * @example
 * import importStyle from 'xblocks-core/utils/importStyle';
 *
 * importStyle(node, {
 *     'tag-name': '.test { color: #000; }'
 * })
 *
 * @module xblocks-core/utils/importStyle
 * @param {HTMLElement} node
 * @param {Object} inline
 */
export default function (node, inline) {
    if (!isPlainObject(inline) || isEmpty(inline)) {
        return;
    }

    const doc = node.ownerDocument;
    const root = node.shadowRoot || doc.head || doc.getElementsByTagName('head')[0];

    forEach(inline, function (css, uid) {
        if (has(root, [ Constants.STYLE, uid ])) {
            return;
        }

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
    });
}
