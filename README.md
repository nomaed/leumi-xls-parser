# Project Name

Parses Bank Leumi exported XLS files into a JSON object

## Installation

`npm install leumi-xls-parser`

## Usage

```js
const fs = require('fs');
const leumiXlsParser = require('leumi-xls-parser');

// load the XLS file into a String or a Buffer
const xlsFile = fs.readFileSync('./some-file.xls');

// returns true/false by testing if the contensts of the file looks like a valid Leumi XLS export
if (leumiXlsParser.isCompatible(xlsFile)) {
    leumiXlsParser.parse(xlsFile)
        .then(data => console.log(data))
        .catch(err => console.log(err));
}
```

## API

```ts
function isCompatible(input: string | Buffer): boolean;
function parse(input: string | Buffer): Promise<Array<LeumiRecord>>;
function parse(input: string | Buffer, callback: (err?: Error, data?: Array<LeumiRecord>) => void): void;
function parseSync(input: string | Buffer): Array<LeumiRecord>;

interface LeumiRecord {
    date: Date;
    description: string;
    reference: string;
    expense: number;
    income: number;
    balance: number;
}
```

## License

[MIT License](LICENSE)

Copyright (c) 2018 Boris Aranovič
