import { error } from 'console';
import { readFileSync } from 'fs';

type Direction = 'up' | 'down' | 'left' | 'right';
type GuardInfo = {
    row: number;
    col: number;
    direction: Direction;
};

const getInitialGuard = (grid: string[]): GuardInfo => {
  for (let row = 0; row < grid.length; row++) {
    const line = grid[row];
    const directionSymbols = ['v', '^', '<', '>'];
    
    for (const symbol of directionSymbols) {
      if (line.includes(symbol)) {
        const col = line.indexOf(symbol);
        
        switch(symbol) {
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
  }
  throw error;
};

const data: string = readFileSync('6/input.txt', 'utf-8');
const grid: string[] = data.split('\n');
const guard: GuardInfo = getInitialGuard(grid);




console.log(guard);
