import { Exo } from '../parser/ExoBuilder';

const exo = new Exo<ParsedData, Result>('./day1/day1data.txt');
type ParsedData = { column1: number[]; column2: number[] };
type Result = string | number;

exo.parse = (lines) => {
  const column1: number[] = [];
  const column2: number[] = [];

  lines.forEach((element) => {
    column1.push(parseInt(element.split('   ')[0]));
    column2.push(parseInt(element.split('   ')[1]));
  });
  return { column1, column2 };
};

const part1 = (parsedData: ParsedData): Result => {
  const { column1, column2 } = parsedData;
  const orderedColum1 = column1.sort((a: number, b: number) => a - b);
  const orderedColum2 = column2.sort((a: number, b: number) => a - b);
  let result = 0;

  orderedColum1.forEach((element: number, index: number) => {
    result += Math.abs(orderedColum1[index] - orderedColum2[index]);
  });
  return result;
};

const part2 = (parsedData: ParsedData): Result => {
  const map = new Map();
  const { column1, column2 } = parsedData;
  column1.forEach((element: number) => {
    map.set(element, 0);
  });

  column2.forEach((element: number) => {
    map.has(element) && map.set(element, map.get(element) + 1);
  });

  let result = 0;

  map.forEach((value: number, key: number) => {
    result += value * key;
  });
  return result;
};
exo.parseData();
exo.run(part1, 'part 1');
exo.run(part2, 'part 2');
