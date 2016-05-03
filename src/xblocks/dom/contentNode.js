/**
 * Obtaining the nodes with content defined by the user.
 *
 * @example
 * <x-element>test</x-element>
 *
 * import contentNode from 'xblocks/dom/contentNode';
 * console.log(contentNode(document.querySelector('x-element')));
 * // test
 *
 * @example
 * <x-element>
 *     <script type="text/x-template">test</script>
 *     other content
 * </x-element>
 *
 * import contentNode from 'xblocks/dom/contentNode';
 * console.log(contentNode(document.querySelector('x-element')));
 * // test
 *
 * @module xblocks/dom/contentNode
 * @param {HTMLElement} node
 * @returns {HTMLElement}
 */
export default function (node) {
    let element;

    if (node.xuid && node.nodeType === 1 && node.hasChildNodes()) {
        element = node.querySelector(`[data-xb-content="${node.xuid}"]`);

        if (!element) {
            element = node.querySelector('script[type="text/x-template"]:not([ref]),template:not([ref])');
        }
    }

    return element || node;
}
