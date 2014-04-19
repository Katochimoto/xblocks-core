(function(xblocks) {

    /**
     * @param {object} to
     * @param {object} from
     * @returns {object}
     */
    xblocks.merge = function(to, from) {
        Object.keys(from).forEach(function(property) {
            Object.defineProperty(to, property, Object.getOwnPropertyDescriptor(from, property));
        });

        return to;
    };

    /**
     * @param {*} param
     * @returns {string}
     */
    xblocks.type = function(param) {
        return ({}).toString.call(param).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    };

}(xblocks));
