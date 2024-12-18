import { readFileSync } from 'fs';

const data: string = readFileSync('3/input.txt', 'utf-8');
const parsedData: string[] = data.split('\n');

const re = /mul\((\d+),(\d+)\)/g;
const getNum = /(\d+)/g;

let count: number = 0;
for (const element of parsedData) {
  const elements: RegExpMatchArray | null = element.match(re);

  if (elements) {
    for (const i of elements) {
      const split: string[] = i.split(',')
      const firstNum = Number(split[0].match(getNum))
      const secondNum = Number(split[1].match(getNum))
      count += firstNum * secondNum
    };
  };
};
console.log(count)