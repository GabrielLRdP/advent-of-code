"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExoBuilder_1 = require("../parser/ExoBuilder");
const exo = new ExoBuilder_1.Exo('./dayx/dayx.txt');
exo.parse = (lines) => {
    return '';
};
const part1 = (parsedData) => {
    return 0;
};
const part2 = (parsedData) => {
    return 0;
};
exo.parseData();
exo.run(part1, 'Part 1');
exo.run(part2, 'Part 2');
