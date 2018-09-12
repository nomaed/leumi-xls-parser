module.exports = {
    isCompatible,
    parse,
    parseSync
};

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
        fieldName: 'expense',
        transform: normalizeNumber
    },
    {
        fieldName: 'income',
        transform: normalizeNumber
    },
    {
        fieldName: 'balance',
        transform: normalizeNumber
    }
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
 * @param {Function} [callback]
 * @returns {Promise<Array<object>>} If no callback has been provided
 * @returns {void} If callback has been provided, it will be used to return the result
 */
function parse(tableDom, callback) {
    // ise Promise API
    if (typeof callback !== 'function') {
        return new Promise((resolve, reject) => {
            resolve(parseSync(tableDom));
        });
    }

    // use callback API
    try {
        callback(undefined, parseSync(tableDom));
    } catch (e) {
        callback(e);
    }
}

/**
 * @param {HTMLTableElement} tableDom
 * @returns {Array<object>}
 */
function parseSync(tableDom) {
    const rows = tableDom.tBodies[0].rows;
    const result = [];
    for (const row of rows) {
        const data = getCellsData(row.cells);
        if (row.className === 'header') {
            continue;
        }
        result.push(normalizeRow(data));
    }
    return result;
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