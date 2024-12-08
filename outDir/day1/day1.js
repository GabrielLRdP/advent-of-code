"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExoBuilder_1 = require("../parser/ExoBuilder");
const exo = new ExoBuilder_1.Exo('./day1/day1data.txt');
exo.parse = (lines) => {
    const column1 = [];
    const column2 = [];
    lines.forEach((element) => {
        column1.push(parseInt(element.split('   ')[0]));
        column2.push(parseInt(element.split('   ')[1]));
    });
    return { column1, column2 };
};
const part1 = (parsedData) => {
    const { column1, column2 } = parsedData;
    const orderedColum1 = column1.sort((a, b) => a - b);
    const orderedColum2 = column2.sort((a, b) => a - b);
    let result = 0;
    orderedColum1.forEach((element, index) => {
        result += Math.abs(orderedColum1[index] - orderedColum2[index]);
    });
    return result;
};
const part2 = (parsedData) => {
    const map = new Map();
    const { column1, column2 } = parsedData;
    column1.forEach((element) => {
        map.set(element, 0);
    });
    column2.forEach((element) => {
        map.has(element) && map.set(element, map.get(element) + 1);
    });
    let result = 0;
    map.forEach((value, key) => {
        result += value * key;
    });
    return result;
};
exo.parseData();
exo.run(part1, 'part 1');
exo.run(part2, 'part 2');
