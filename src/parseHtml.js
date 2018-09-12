/**
 * Browser only version, without JSDOM inclusion
 */

module.exports = function getTableDom(htmlString) {
    if (typeof DOMParser === 'undefined') {
        // Node.JS
        const JSDOM = require("jsdom").JSDOM;
        return new JSDOM(htmlString).window.document.querySelector('table.dataTable');
    }

    // browser
    return new DOMParser().parseFromString(htmlString, 'text/html').querySelector('table.dataTable');
}