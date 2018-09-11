const leumiXlsParser = require('./leumiXlsParser');

module.exports = {
    isCompatible: leumiXlsParser.isCompatible,
    parse: htmlString => leumiXlsParser.parse(
        new DOMParser().parseFromString(htmlString, 'text/html').querySelector('table.dataTable')
    )
}