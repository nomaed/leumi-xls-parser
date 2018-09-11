#!/usr/bin/env node

const path = require("path");
const fs = require("fs").promises;
const LeumiXls = require("./lib/leumi-xls");

function printUsage() {
    const relPath = path.relative(process.cwd(), __filename);
    const execFile = (relPath.charAt(0) === '.' ? '' : './') + relPath;
    console.log(`Usage: node ${execFile} <input-file>`);
}

if (!process.argv[2]) {
    printUsage();
    process.exit(1);
}

const sourceFile = fs.readFile(process.argv[2])
    .then(data => {
        console.log('Data read; %d bytes', data.byteLength);
        return data;
    })
    .then(data => {
        if (LeumiXls.isCompatible(data)) {
            const leumi = new LeumiXls(data)
            return leumi.parse();
        } else {
            throw TypeError('File is not a recognizable Leumi XLS document');
        }
    })
    .then(parsed => {
        console.log('Headers:');
        parsed.headers.forEach((header, i) => console.log('%d: %s', i, header));

        console.log('');
        console.log('Data:');
        parsed.data.forEach((row, rowIndex) => {
            console.log('%d: %s', rowIndex, row.join(', '));
        });
    })
    .catch(err => {
        console.error('Error:', err.message);
        console.log(err.stack);
    });