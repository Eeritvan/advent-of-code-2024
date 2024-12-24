import { readFileSync } from 'fs';

interface StackItem {
  value: number;
  index: number;
}

const data: string = readFileSync('7/input.txt', 'utf-8');
const lines: string[] = data.split('\n');
let result: number = 0;

for (const line of lines) {
  const trimmedLine: string[] = line.trim().split(':');
  const target: number = parseInt(trimmedLine[0]);
  const numbers = trimmedLine[1].trim().split(' ').map(Number);

  const stack: StackItem[] = [{ value: numbers[0], index: 0 }];
  while (stack.length) {
    const { value, index } = stack.pop()!;
    if (value === target && index === numbers.length - 1) { 
      result += target;
      break;
    } else if (index < numbers.length - 1) {
      const next = numbers[index + 1];
      stack.push(
        { value: value + next, index: index + 1 },
        { value: value * next, index: index + 1 }
      );
    }
  }
};

console.log(result);
