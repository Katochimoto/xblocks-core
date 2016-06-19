import Constants from './../constants';

/**
 * Obtaining the nodes with content defined by the user.
 *
 * @example
 * <x-element>test</x-element>
 *
 * import contentNode from 'xblocks-core/dom/contentNode';
 * console.log(contentNode(document.querySelector('x-element')));
 * // test
 *
 * @example
 * <x-element>
 *     <script type="text/x-template">test</script>
 *     other content
 * </x-element>
 *
 * import contentNode from 'xblocks-core/dom/contentNode';
 * console.log(contentNode(document.querySelector('x-element')));
 * // test
 *
 * @module xblocks-core/dom/contentNode
 * @param {HTMLElement} node
 * @returns {HTMLElement}
 */
export default function (node) {
    const uid = node[ Constants.UID ];
    let element;

    if (uid && node.nodeType === 1 && node.hasChildNodes()) {
        element = node.querySelector(`[data-xb-content="${uid}"]`);

        if (!element) {
            element = node.querySelector('script[type="text/x-template"]:not([ref]),template:not([ref])');
        }
    }

    return element || node;
}
