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
function parse(input: string | Buffer, callback: (err: Error, data?: string | Buffer) => void): void;
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

MIT License

Copyright (c) 2018 Boris Aranovič

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
