#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const leumiXlsParser = require('./index');

function printUsage() {
    const relPath = path.relative(process.cwd(), __filename);
    const execFile = (relPath.charAt(0) === '.' ? '' : './') + relPath;
    console.log(`Usage: node ${execFile} <input-file>`);
}

if (!process.argv[2]) {
    printUsage();
    process.exit(1);
}

async function readFilePromise(filename) {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

async function main(filename) {
    try {
        const data = await readFilePromise(filename);
        if (!leumiXlsParser.isCompatible(data)) {
            throw new TypeError('Data is not a valid Leumi XLS file');
        }
        const parsed = leumiXlsParser.parseSync(data);
        console.log(JSON.stringify(parsed));
    } catch(e) {
        console.error(e.stack);
        process.exit(1);
    }
}

main(process.argv[2]);