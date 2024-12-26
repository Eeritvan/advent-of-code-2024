import { readFileSync } from 'fs';

const lines: string[] = readFileSync('10/input.txt', 'utf-8').split('\n');

const startingPoints: string[] = [];
const grid = new Map<string, number>();

for (let i = 0; i < lines.length; i++) {
  const line = lines[i]; 
  for (let j = 0; j < line.length; j++) {
    grid.set(`${i},${j}`, parseInt(line[j]));
    if (line[j] == '0') {
      startingPoints.push(`${i},${j}`);
    }
  }
}


let result = 0;
for (const point of startingPoints) {
  const queue: string[] = [point];
  const visited = new Set<string>([point]);

  while (queue.length) {
    const pos = queue.shift()!;
    const currentValue = grid.get(pos)!;
    if (currentValue === 9) {
      result += 1;
    }
  
    const [x, y] = pos.split(',').map(Number);
    const neighbors = [
      `${x+1},${y}`,
      `${x-1},${y}`,
      `${x},${y+1}`,
      `${x},${y-1}`
    ];
    

    for (const neighbor of neighbors) {
      if (grid.has(neighbor) && grid.get(neighbor) === currentValue + 1 && !visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}
console.log(result);
