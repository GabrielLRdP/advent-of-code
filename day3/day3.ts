import { Exo } from '../parser/ExoBuilder';

const exo = new Exo<ParsedData, Result>('./day3/day3.txt');
type ParsedData = string;
type Result = string | number | RegExpExecArray[] | any;

exo.parse = (lines) => {
  return lines.join('');
};
const mulRegex = /mul\(([0-9]+),([0-9]+)\)/g;
const funcRegex = /do\(\)|don't\(\)|mul\(([0-9]+),([0-9]+)\)/g;

const part1 = (parsedData: ParsedData): Result => {
  const matches = parsedData.matchAll(mulRegex);
  let result = 0;

  for (const match of matches) {
    result += parseInt(match[1]) * parseInt(match[2]);
  }
  return result;
};

const part2 = (parsedData: ParsedData): Result => {
  const matches = parsedData.matchAll(funcRegex);
  let result = 0;
  let enable = 1;
  for (const match of matches) {
    switch (match[0]) {
      case 'do()':
        enable = 1;
        break;
      case "don't()":
        enable = 0;
        break;
      default:
        result += parseInt(match[1]) * parseInt(match[2]) * enable;
    }
  }
  return result;
};
exo.parseData();
exo.run(part1, 'Part 1');
exo.run(part2, 'Part 2');
