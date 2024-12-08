import { Exo } from '../parser/ExoBuilder';

const exo = new Exo<ParsedData, Result>('./dayx/dayx.txt');
type ParsedData = string;
type Result = string | number;

exo.parse = (lines) => {
  return '';
};

const part1 = (parsedData: ParsedData): Result => {
  return 0;
};

const part2 = (parsedData: ParsedData): Result => {
  return 0;
};
exo.parseData();
exo.run(part1, 'Part 1');
exo.run(part2, 'Part 2');
