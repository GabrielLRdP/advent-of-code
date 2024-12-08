import { dir } from 'console';
import { Exo } from '../parser/ExoBuilder';

const exo = new Exo<ParsedData, Result>('./day6/day6.txt');
type ParsedData = { map: string[][]; width: number; height: number };
type Result = string | number | boolean;

exo.parse = (lines) => {
  const newLines = lines.map((e) => e.split(''));
  const width = lines[0].length;
  const height = lines.length;
  const map = newLines;
  return { map, width, height };
};

const part1 = (parsedData: ParsedData): Result => {
  const { map, width, height } = parsedData;
  const up = [0, -1];
  const right = [1, 0];
  const down = [0, 1];
  const left = [-1, 0];
  const dirMap = new Map();
  dirMap.set(up, right);
  dirMap.set(right, down);
  dirMap.set(down, left);
  dirMap.set(left, up);
  const pos = {
    w: 0,
    h: 0,
    dir: [0, 0],
  };
  map.forEach((line, index) => {
    if (line.indexOf('^') !== -1) {
      pos.w = line.indexOf('^');
      pos.h = index;
      pos.dir = up;
    }
  });
  while (pos.w < width && pos.h < height && pos.w >= 0 && pos.h >= 0) {
    map[pos.h][pos.w] = 'X';
    if (
      pos.h + pos.dir[1] < height &&
      pos.w + pos.dir[0] < width &&
      pos.h > 0 &&
      pos.w > 0 &&
      map[pos.h + pos.dir[1]][pos.w + pos.dir[0]] === '#'
    ) {
      pos.dir = dirMap.get(pos.dir);
    }
    pos.w += pos.dir[0];
    pos.h += pos.dir[1];
  }
  let result = 0;
  map.forEach((line) => {
    line.forEach((element) => {
      if (element === 'X') {
        result++;
      }
    });
  });
  return result;
};

const checkIfLoop = (parsedData: ParsedData): boolean => {
  const { map, width, height } = parsedData;
  const mapCopy: string[][] = JSON.parse(JSON.stringify(map));
  // console.log(mapCopy.map((e) => e.join('')).join('\n'), '\n\n');
  const up = [0, -1];
  const right = [1, 0];
  const down = [0, 1];
  const left = [-1, 0];
  const dirMap = new Map();
  dirMap.set(up, right);
  dirMap.set(right, down);
  dirMap.set(down, left);
  dirMap.set(left, up);
  const pos = {
    w: 0,
    h: 0,
    dir: up,
  };
  mapCopy.forEach((line, index) => {
    if (line.indexOf('^') !== -1) {
      pos.w = line.indexOf('^');
      pos.h = index;
      pos.dir = up;
    }
  });
  const dirChangeHistory = new Map();

  while (
    pos.h + pos.dir[1] < height &&
    pos.w + pos.dir[0] < width &&
    pos.h + pos.dir[1] >= 0 &&
    pos.w + pos.dir[0] >= 0
  ) {
    if (map[pos.h + pos.dir[1]][pos.w + pos.dir[0]] === '#') {
      if (
        dirChangeHistory.has(`${pos.w},${pos.h}`) &&
        dirChangeHistory
          .get(`${pos.w},${pos.h}`)
          .some((e: number[]) => e[0] === pos.dir[0] && e[1] === pos.dir[1])
      ) {
        return true;
      }
      dirChangeHistory.set(
        `${pos.w},${pos.h}`,
        Array.isArray(dirChangeHistory.get(`${pos.w},${pos.h}`))
          ? [...dirChangeHistory.get(`${pos.w},${pos.h}`), pos.dir]
          : [pos.dir]
      );
      pos.dir = dirMap.get(pos.dir);
    }
    pos.w += pos.dir[0];
    pos.h += pos.dir[1];
  }

  // console.log(pos.w, ' ', pos.h, ' ', pos.dir);
  return false;
};

const part2 = (parsedData: ParsedData): Result => {
  const { map, width, height } = parsedData;
  let result = 0;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const saved = map[i][j];

      if (saved !== '^' && saved !== '#') {
        map[i][j] = '#';
        if (checkIfLoop({ map, width, height })) {
          result++;
        }
        map[i][j] = saved;
      }
    }
  }
  return result;
};
exo.parseData();
// exo.run(part1, 'Part 1');
exo.run(part2, 'Part 2');
