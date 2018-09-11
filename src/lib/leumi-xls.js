const JSDOM = require("jsdom").JSDOM;

const headerNames = new Map([
    ['תאריך', 'date'],
    ['תיאור', 'description'],
    ['אסמכתא', 'reference'],
    ['חובה', 'debit'],
    ['זכות', 'credit'],
    ['יתרה בש"ח', 'balance']
]);

const dataTypes = [
    normalizeDate,
    String,
    String,
    normalizeNumber,
    normalizeNumber,
    normalizeNumber,
];

function normalizeNumber(v) {
    return Number(v.replace(',', ''));
}

function normalizeDate(d) {
    let [day, month, year] = d.split('/');
    year = ((year < 0) ? '19' : '20') + year;
    return new Date(`${year}-${month}-${day}`);
}

class LeumiXls {
    constructor(data) {
        this.data = data;
    }

    static isCompatible(data) {
        try {
            const str = data.toString();
            return str.includes('urn:schemas-microsoft-com:office:excel') &&
                str.includes('bankleumi.co.il') &&
                str.includes('ישיר לאומי - תנועות בחשבון');
        } catch (e) {
            console.warn(e);
            return false;
        }
    }

    parse() {
        return new Promise((resolve,
            reject) => {
            const dom = new JSDOM(this.data);
            const table = dom.window.document.querySelector('table.dataTable');
            const tableRows = table.tBodies[0].rows;
            const result = {
                headers: [],
                data: []
            };
            for (const row of tableRows) {
                const data = this.getCellsData(row.cells);
                if (row.className === 'header') {
                    result.headers = data;
                } else {
                    result.data.push(this.normalizeRow(result.headers, data));
                }
            }
            resolve(result);
        });
    }

    getCellsData(cells) {
        const data = [];
        for (const cell of cells) {
            data.push(cell.textContent.trim())
        }
        return data;
    }

    normalizeHeaders(headers) {
        return headers.map(val => headerNames.get(val) || val);
    }

    normalizeRow(headers, data) {
        return data.map((value, i) => dataTypes[i](value));
    }
}

module.exports = LeumiXls;