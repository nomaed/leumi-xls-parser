module.exports = {
    isCompatible: leumiXlsParser.isCompatible,
    parse: htmlString => leumiXlsParser.parse(getTableDom(htmlString))
}

function getTableDom(htmlString) {
    return new DOMParser().parseFromString(htmlString, 'text/html').querySelector('table.dataTable');
}