"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExoBuilder_1 = require("../parser/ExoBuilder");
const exo = new ExoBuilder_1.Exo('./day2/day2data.txt');
exo.parse = (line) => {
    const parsed = [];
    line.forEach((element) => {
        parsed.push(element.split(' ').map((e) => parseInt(e)));
    });
    return parsed;
};
const part1 = (parsedData) => {
    let result = 0;
    const checkLine = (parsedElement) => {
        const dir = parsedElement[0] - parsedElement[1] < 0 ? 1 : -1;
        let isElementSafe = true;
        parsedElement.forEach((e, index) => {
            const nextElement = parsedElement[index + 1];
            if (nextElement === undefined) {
                return;
            }
            if (Math.abs(e - nextElement) > 3 || e === nextElement) {
                isElementSafe = false;
                return;
            }
            if ((dir === 1 && nextElement - e < 0) ||
                (dir === -1 && nextElement - e > 0)) {
                isElementSafe = false;
                return;
            }
        });
        return isElementSafe;
    };
    parsedData.forEach((line) => {
        if (checkLine(line)) {
            result++;
        }
    });
    return result;
};
const part2 = (parsedData) => {
    let result = 0;
    const lines1 = [];
    const lines2 = [];
    const checkLine = (parsedElement) => {
        const dir = parsedElement[0] - parsedElement[1] < 0 ? 1 : -1;
        let errorCount = 0;
        let errorIndex = -1;
        parsedElement.forEach((e, index) => {
            const nextElement = parsedElement[index + 1];
            if (nextElement === undefined) {
                return;
            }
            if (Math.abs(e - nextElement) > 3 || e === nextElement) {
                errorCount++;
                errorIndex = index;
            }
            if ((dir === 1 && nextElement - e < 0) ||
                (dir === -1 && nextElement - e > 0)) {
                errorCount++;
                errorIndex = index;
            }
        });
        return { errorCount: errorCount, errorIndex: errorIndex };
    };
    parsedData.forEach((line) => {
        const { errorCount } = checkLine(line);
        if (errorCount === 0) {
            lines1.push(line);
            result++;
        }
        else {
            for (let i = 0; i < line.length; i++) {
                const newLine = [...line];
                newLine.splice(i, 1);
                if (checkLine(newLine).errorCount === 0) {
                    result++;
                    break;
                }
            }
        }
    });
    parsedData.forEach((line) => {
        const { errorCount, errorIndex } = checkLine(line);
        if (errorCount === 0) {
            lines2.push(line);
        }
    });
    return result;
};
exo.parseData();
exo.run(part1, 'Part 1');
exo.run(part2, 'Part 2');
