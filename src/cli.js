#!/usr/bin/env node
const path = require('path');
const fs = require('fs').promises;
const leumiXlsParser = require('./leumiXlsParser');
const JSDOM = require("jsdom").JSDOM;

function printUsage() {
    const relPath = path.relative(process.cwd(), __filename);
    const execFile = (relPath.charAt(0) === '.' ? '' : './') + relPath;
    console.log(`Usage: node ${execFile} <input-file>`);
}

if (!process.argv[2]) {
    printUsage();
    process.exit(1);
}
fs.readFile(process.argv[2])
    .then(data => {
        console.log('Data read; %d bytes', data.byteLength);
        if (leumiXlsParser.isCompatible(data)) {
            return leumiXlsParser.parse(
                new JSDOM(data).window.document.querySelector('table.dataTable')
                );
        } else {
            throw new TypeError('Data is not a valid Leumi XLS file');
        }
    })
    .then(parsed => {
        console.log(parsed);
    })
    .catch(err => {
        console.error('Error:', err.message);
        console.log(err.stack);
    });