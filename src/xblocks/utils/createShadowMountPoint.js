import createShadowRoot from './createShadowRoot';

/**
 * Creates a mount point in the shadow root.
 *
 * @example
 * var mountPoint = createShadowMountPoint(HTMLElement node);
 * ReactDOM.render(<App />, mountPoint);
 *
 * @module xblocks-core/utils/createShadowMountPoint
 * @param {HTMLElement} node
 * @returns {HTMLElement|null}
 * @private
 */
export default function (node) {
    const root = createShadowRoot(node);

    if (!root) {
        return null;
    }

    let point = root.getElementById('xblocks-mount-point');

    if (!point) {
        point = node.ownerDocument.createElement('div');
        point.id = 'xblocks-mount-point';
        root.appendChild(point);
    }

    return point;
}
