import { error } from 'console';
import { readFileSync } from 'fs';

type Direction = 'up' | 'down' | 'left' | 'right';
type GuardInfo = {
    row: number;
    col: number;
    direction: Direction;
};

const getInitialGuard = (grid: Map<string, string>): GuardInfo => {
  for (const [coord, value] of grid) {
    if (['v', '^', '<', '>'].includes(value)) {
      const [row, col] = coord.slice(1, -1).split(',').map(Number);
      
      switch(value) {
        case 'v':
          return { row, col, direction: 'down' };
        case '^':
          return { row, col, direction: 'up' };
        case '<':
          return { row, col, direction: 'left' };
        case '>':
          return { row, col, direction: 'right' };
      }
    }
  }
  throw error;
};

const validateGuardPos = (guard: GuardInfo, maxRow:number, maxCol: number): boolean => {
  if (guard.col <= 0 || guard.col >= maxCol)  {
    return false;
  }
  else if (guard.row <= 0 || guard.row >= maxRow)  {
    return false;
  }

  return true;
};

const data: string = readFileSync('6/input.txt', 'utf-8');
const lines: string[] = data.split('\n');
const grid = new Map<string, string>();
let maxRow: number = -1;
let maxCol: number = -1;

for (let i: number = 0; i < lines.length; i++) {
  const line: string = lines[i];
  maxRow = i;
  for (let j: number = 0; j < line.length; j++) {
    const char: string = line[j];
    grid.set(`(${i},${j})`, char);
    maxCol = j;
  }
}

const guard: GuardInfo = getInitialGuard(grid);
const visitedSquares = new Set<string>([`(${guard.row},${guard.col})`]);

while (validateGuardPos(guard, maxRow, maxCol)) {
  switch (guard.direction) {
    case 'up':
      if (grid.get(`(${guard.row - 1},${guard.col})`) === '#') {
        guard.direction = 'right';
        guard.col += 1;
      } else {
        guard.row -= 1;
      }
      break;
    case 'right':
      if (grid.get(`(${guard.row},${guard.col + 1})`) === '#') {
        guard.direction = 'down';
        guard.row += 1;
      } else {
        guard.col += 1;
      }
      break;
    case 'down':
      if (grid.get(`(${guard.row + 1},${guard.col})`) === '#') {
        guard.direction = 'left';
        guard.col -= 1;
      } else {
        guard.row += 1;
      }
      break;
    case 'left':
      if (grid.get(`(${guard.row},${guard.col - 1})`) === '#') {
        guard.direction = 'up';
        guard.row -= 1;
      } else {
        guard.col -= 1;
      }
      break;
  }
  visitedSquares.add(`(${guard.row},${guard.col})`);
}

console.log(visitedSquares.size);
