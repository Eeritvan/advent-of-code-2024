import { readFileSync } from 'fs';

const data: string = readFileSync('4/input.txt', 'utf-8');
const parsedData: string[] = data.split('\n');

const grid = new Map<string, string>();

for (let i: number = 0; i < parsedData.length; i++) {
  const line: string = parsedData[i];

  for (let j: number = 0; j < line.length; j++) {
    const char: string = line[j];
    grid.set(`(${i},${j})`, char);
  }
}

let counter: number = 0;
const DIRECTIONS = [
  [-1,-1], [-1,0], [-1,1],
  [0,-1],          [0,1],
  [1,-1],  [1,0],  [1,1]
];

for (let i: number = 0; i < parsedData.length; i++) {
  const line: string = parsedData[i];
  for (let j: number = 0; j < line.length; j++) {
    for (const [yDirection, xDirection] of DIRECTIONS) {
      const str: string =
          (grid.get(`(${i},${j})`) ?? '.') + 
          (grid.get(`(${i+yDirection},${j+xDirection})`) ?? '') +
          (grid.get(`(${i+2*yDirection},${j+2*xDirection})`) ?? '') +
          (grid.get(`(${i+3*yDirection},${j+3*xDirection})`) ?? '');
      if (str === 'XMAS') {
        counter++;
      }
    }
  }
}
console.log(counter);
