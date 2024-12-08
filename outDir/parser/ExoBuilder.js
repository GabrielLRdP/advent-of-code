"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exo = void 0;
const fs_1 = require("fs");
class Exo {
    constructor(filePath) {
        this.rawData = (0, fs_1.readFileSync)(filePath, 'utf-8').split('\n');
        this.parse = (rawData) => {
            throw new Error('Parse method not implemented');
        };
        this.parsedData = undefined;
    }
    parseData() {
        const start = process.hrtime();
        const parsedData = this.parse(this.rawData);
        const end = process.hrtime(start);
        this.parsedData = parsedData;
        console.log(`\nParsed Data in \x1b[1m\x1b[34m${end[0] * 1000 + end[1] / 1e6} ms\x1b[0m\n`);
    }
    run(exo, name) {
        if (!this.parsedData) {
            throw new Error('Data has to be parsed first');
        }
        const start = process.hrtime();
        const result = exo(this.parsedData);
        const end = process.hrtime(start);
        console.log(`\n${name} result: \x1b[1m\x1b[32m${result}\x1b[0m\nPerformance: \x1b[1m\x1b[34m${end[0] * 1000 + end[1] / 1e6} ms\x1b[0m\n`);
    }
}
exports.Exo = Exo;
