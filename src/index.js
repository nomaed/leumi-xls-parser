/**
 * Node.JS & Browser compatible version, uses DOMParser in browser or
 * imports JSDOM on demand in node environment.
 */

const leumiXlsParser = require('./parser');
const getTableDom = require('./parseHtml');

module.exports = {
    isCompatible: leumiXlsParser.isCompatible,
    parse: htmlString => leumiXlsParser.parse(getTableDom(htmlString)),
    parseSync: htmlString => leumiXlsParser.parseSync(getTableDom(htmlString)),
}
