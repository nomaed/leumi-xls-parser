const COLUMNS_META = [{
        fieldName: 'date',
        transform: normalizeDate
    },
    {
        fieldName: 'description',
        transform: normalizeString
    },
    {
        fieldName: 'reference',
        transform: normalizeString
    },
    {
        fieldName: 'debit',
        transform: normalizeNumber
    },
    {
        fieldName: 'credit',
        transform: normalizeNumber
    },
    {
        fieldName: 'balance',
        transform: normalizeNumber
    },
];

/**
 * Checks whether the source of an XLS (HTML/XML) file is a recognized Leumi export
 * @param {string} data
 * @returns {boolean}
 */
function isCompatible(data) {
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

/**
 * Extracts data out of an HTML table element
 * @param {HTMLTableElement} tableDom
 * @returns {Promise<Array<object>>}
 */
function parse(tableDom) {
    return new Promise((resolve, reject) => {
        const rows = tableDom.tBodies[0].rows;
        const result = [];
        for (const row of rows) {
            const data = getCellsData(row.cells);
            if (row.className === 'header') {
                continue;
            }
            result.push(normalizeRow(data));
        }
        resolve(result);
    });
}

function normalizeNumber(v) {
    return Number(v.replace(',', ''));
}

function normalizeString(s) {
    return String(s).trim();
}

function normalizeDate(d) {
    let [day, month, year] = d.split('/');
    year = ((year < 0) ? '19' : '20') + year;
    return new Date(`${year}-${month}-${day}`);
}


function getCellsData(cells) {
    const data = [];
    for (const cell of cells) {
        data.push(cell.textContent.trim())
    }
    return data;
}

function normalizeRow(data) {
    const obj = {};
    data.forEach((value, idx) => {
        const meta = COLUMNS_META[idx];
        obj[meta.fieldName] = meta.transform(value);
    })
    return obj;
}
module.exports = {
    isCompatible,
    parse
};