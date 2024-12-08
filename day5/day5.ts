import { Exo } from '../parser/ExoBuilder';

const exo = new Exo<ParsedData, Result>('./day5/day5.txt');
type ParsedData = { rules: Map<number, number[]>; updates: number[][] };
type Result = string | number | number[][];

exo.parse = (lines) => {
  const rules: Map<number, number[]> = new Map();
  const rawupdates: string[] = [];
  lines.forEach((e) => {
    if (e === '') {
      return;
    } else if (e.includes('|')) {
      const splited = e.split('|');
      const parsed = splited.map((ele) => {
        return parseInt(ele);
      });
      const rule = rules.get(parsed[0]);
      const isRuleArray = Array.isArray(rule);
      rules.set(parsed[0], isRuleArray ? [...rule, parsed[1]] : [parsed[1]]);
    } else {
      rawupdates.push(e);
    }
  });

  const parsedUpdate1 = rawupdates.map((e) => e.split(','));
  const updates: number[][] = [];
  parsedUpdate1.forEach((element) => {
    updates.push(
      element.map((e) => {
        return parseInt(e);
      })
    );
  });

  return { rules, updates };
};

const faultyTab: number[][] = [];

const part1 = (parsedData: ParsedData): Result => {
  const { rules, updates } = parsedData;
  const checkUpdate = (update: number[]) => {
    let result = true;
    for (let i = 1; i < update.length; i++) {
      const copy = [...update];
      const subSet = copy.splice(0, i);
      subSet.forEach((element) => {
        if (rules.get(update[i])?.includes(element)) {
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
    } else {
      faultyTab.push(update);
    }
  });
  return result;
};

const part2 = (parsedData: ParsedData): Result => {
  const { rules } = parsedData;
  let result = 0;
  const sortedUpdates = faultyTab.map((update) => {
    return update.sort((a, b) => {
      return rules.get(a)?.includes(b) ? -1 : 0;
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
