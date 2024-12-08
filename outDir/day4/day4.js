"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExoBuilder_1 = require("../parser/ExoBuilder");
const exo = new ExoBuilder_1.Exo('./day4/day4.txt');
exo.parse = (lines) => {
    const parsed = lines.map((e) => e.split(''));
    return parsed;
};
const part1 = (parsedData) => {
    let xmasCount = 0;
    const nbLines = parsedData.length;
    const nbCol = parsedData[0].length;
    const checkXmas = (line, column) => {
        let result = 0;
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if (parsedData[line + 3 * i] &&
                    parsedData[line + 3 * i][column + 3 * j] &&
                    parsedData[line + i][column + j] === 'M' &&
                    parsedData[line + 2 * i][column + 2 * j] === 'A' &&
                    parsedData[line + 3 * i][column + 3 * j] === 'S') {
                    result++;
                }
            }
        }
        return result;
    };
    for (let line = 0; line < nbLines; line++) {
        for (let column = 0; column < nbCol; column++) {
            if (parsedData[line][column] === 'X') {
                xmasCount += checkXmas(line, column);
            }
        }
    }
    return xmasCount;
};
const part2 = (parsedData) => {
    let xmasCount = 0;
    const nbLines = parsedData.length;
    const nbCol = parsedData[0].length;
    const checkXmas = (line, column) => {
        if (((parsedData[line + 1][column - 1] === 'M' &&
            parsedData[line - 1][column + 1] === 'S') ||
            (parsedData[line + 1][column - 1] === 'S' &&
                parsedData[line - 1][column + 1] === 'M')) &&
            ((parsedData[line - 1][column - 1] === 'M' &&
                parsedData[line + 1][column + 1] === 'S') ||
                (parsedData[line - 1][column - 1] === 'S' &&
                    parsedData[line + 1][column + 1] === 'M'))) {
            return 1;
        }
        return 0;
    };
    for (let line = 1; line < nbLines - 1; line++) {
        for (let column = 1; column < nbCol - 1; column++) {
            if (parsedData[line][column] === 'A') {
                xmasCount += checkXmas(line, column);
            }
        }
    }
    return xmasCount;
};
exo.parseData();
exo.run(part1, 'Part 1');
exo.run(part2, 'Part 2');
