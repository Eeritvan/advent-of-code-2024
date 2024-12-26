import { readFileSync } from 'fs';

const lines: string[] = readFileSync('18/input.txt', 'utf-8').split('\n');
const grid = new Map<string, string>();

for (let y = 0; y <= 70; y++) {
  for (let x = 0; x <= 70; x++) {
      grid.set(`${x},${y}`, '.');
  }
}

for (let i = 0; i < 1024; i++) {
  const [x, y] = lines[i].trim().split(',');
  grid.set(`${x},${y}`, '#');
}

const queue: [string, number][] = [['0,0', 0]];
const visited = new Set<string>(['0,0']);

while (queue.length) {
  const [pos, steps] = queue.shift()!;
  if (pos === '70,70') {
    break;
  }

  const [x, y] = pos.split(',').map(Number);
  const neighbors = [
    `${x+1},${y}`,
    `${x-1},${y}`,
    `${x},${y+1}`,
    `${x},${y-1}`
  ];
  
  for (const neighbor of neighbors) {
    if (grid.has(neighbor) && grid.get(neighbor) === '.' && !visited.has(neighbor)) {
      visited.add(neighbor);
      queue.push([neighbor, steps + 1]);
    }
  }
}
console.log(queue[0][1]);