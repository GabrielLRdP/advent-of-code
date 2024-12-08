"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ExoBuilder_1 = require("../parser/ExoBuilder");
const exo = new ExoBuilder_1.Exo('./day5/day5.txt');
exo.parse = (lines) => {
    const rules = new Map();
    const rawupdates = [];
    lines.forEach((e) => {
        if (e === '') {
            return;
        }
        else if (e.includes('|')) {
            const splited = e.split('|');
            const parsed = splited.map((ele) => {
                return parseInt(ele);
            });
            const rule = rules.get(parsed[0]);
            const isRuleArray = Array.isArray(rule);
            rules.set(parsed[0], isRuleArray ? [...rule, parsed[1]] : [parsed[1]]);
        }
        else {
            rawupdates.push(e);
        }
    });
    const parsedUpdate1 = rawupdates.map((e) => e.split(','));
    const updates = [];
    parsedUpdate1.forEach((element) => {
        updates.push(element.map((e) => {
            return parseInt(e);
        }));
    });
    return { rules, updates };
};
const faultyTab = [];
const part1 = (parsedData) => {
    const { rules, updates } = parsedData;
    const checkUpdate = (update) => {
        let result = true;
        for (let i = 1; i < update.length; i++) {
            const copy = [...update];
            const subSet = copy.splice(0, i);
            subSet.forEach((element) => {
                var _a;
                if ((_a = rules.get(update[i])) === null || _a === void 0 ? void 0 : _a.includes(element)) {
                    result = false;
                    return;
                }
            });
            if (!result) {
                break;
            }
        }
        return result;
    };
    let result = 0;
    updates.forEach((update) => {
        if (checkUpdate(update)) {
            const middleIndex = Math.floor(update.length / 2);
            result += update[middleIndex];
        }
        else {
            faultyTab.push(update);
        }
    });
    return result;
};
const part2 = (parsedData) => {
    const { rules } = parsedData;
    let result = 0;
    const sortedUpdates = faultyTab.map((update) => {
        return update.sort((a, b) => {
            var _a;
            return ((_a = rules.get(a)) === null || _a === void 0 ? void 0 : _a.includes(b)) ? -1 : 0;
        });
    });
    sortedUpdates.forEach((update) => {
        const middleIndex = Math.floor(update.length / 2);
        result += update[middleIndex];
    });
    return result;
};
exo.parseData();
exo.run(part1, 'Part 1');
exo.run(part2, 'Part 2');
