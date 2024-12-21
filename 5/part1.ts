import { readFileSync } from 'fs';

const data: string = readFileSync('5/input.txt', 'utf-8');
const parsedData: string[] = data.split('\n');

const rules = new Map<number, number[]>();
const numberLines: number[][] = [];

for (const line of parsedData) {
  if (line.includes('|')) {
    const [first, second] = line.split('|').map(Number);
    const existingRules = rules.get(first) ?? [];
    rules.set(first, [...existingRules, second]);
  } else if (line.includes(',')) {
    const numbers = line.split(',').map(Number);
    numberLines.push(numbers);
  }
}

const result: number = numberLines
  .filter((line: number[]): boolean => {
    for (let i: number = 0; i < line.length - 1; i++) {
      const currentNum = line[i];
      const remainingNums = line.slice(i + 1);
      if (!remainingNums.every((num: number) => rules.get(currentNum)?.includes(num))) {
        return false;
      }
    }
    return true;
  })
  .reduce((sum: number, line: number[]) => sum + line[Math.floor(line.length / 2)], 0);

  console.log(result);
