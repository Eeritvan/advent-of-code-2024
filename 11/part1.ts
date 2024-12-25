import { readFileSync } from 'fs';

const data: string = readFileSync('11/input.txt', 'utf-8');
let stones: number[] = data.trim().split(' ').map(Number);

for (let i = 0; i < 25; i++) {
  const newList: number[] = [];
  for (let i = 0; i < stones.length; i++) {
    const stone = stones[i];
    if (stone === 0) {
      newList.push(1);
    } else if ((Math.floor(Math.log10(stone)) + 1)%2 === 0) {
      const digits = Math.floor(Math.log10(stone)) + 1;
      const half = digits / 2;
      const divisor = Math.pow(10, half);
      const leftPart = Math.floor(stone / divisor);
      const rightPart = stone % divisor;
      newList.push(leftPart);
      newList.push(rightPart);
    } else {
      newList.push(stone * 2024);
    }
  }
  stones = newList;
}

console.log(stones.length);