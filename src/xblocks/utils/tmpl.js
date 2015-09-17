'use strict';

var cache = {};

/**
 * Template engine
 * @function xblocks.utils.tmpl
 * @param {string} str template
 * @param {object} data the template data
 * @returns {string}
 * @see http://ejohn.org/blog/javascript-micro-templating/
 */
module.exports = function (str, data) {
    if (!cache.hasOwnProperty(str)) {
        /* eslint no-spaced-func:0 */
        cache[ str ] = new Function ('obj',
           'var p=[],print=function(){p.push.apply(p,arguments);};' +
           'with(obj){p.push(\'' +
           str.replace(/[\r\t\n]/g, ' ')
               .split('<%').join('\t')
               .replace(/((^|%>)[^\t]*)'/g, '$1\r')
               .replace(/\t=(.*?)%>/g, '\',$1,\'')
               .split('\t').join('\');')
               .split('%>').join('p.push(\'')
               .split('\r').join('\\\'') +
               '\');}return p.join(\'\');');
    }

    return data ? cache[ str ](data) : cache[ str ];
};
