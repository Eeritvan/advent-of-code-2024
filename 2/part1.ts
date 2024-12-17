import { readFileSync } from 'fs';

const data: string = readFileSync('2/input.txt', 'utf-8');
const parsedData: string[] = data.split('\n');

let counter = 0;
for (const line of parsedData) {
  const parsedLine: string[] = line.split(' ');
  let isIncreasing =  true;
  let isDecreasing = true;

  for (let index = 1; index < parsedLine.length; index++) {
    const currentNum = Number(parsedLine[index]);
    const previousNum = Number(parsedLine[index-1]);
    const Difference = currentNum - previousNum

    if (Math.abs(Difference) < 1 || Math.abs(Difference) > 3) {
      isIncreasing = false;
      isDecreasing = false;
    }

    if (Difference <= 0)
      isIncreasing = false;

    if (Difference >= 0)
      isDecreasing = false;
  };
  
  if (isIncreasing || isDecreasing)
    counter++;
};

console.log(counter);
