/**
 * Browser only version, without JSDOM inclusion
 */

module.exports = function getTableDom(htmlString) {
    return new DOMParser().parseFromString(htmlString, 'text/html').querySelector('table.dataTable');
}