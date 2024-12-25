import { readFileSync } from 'fs';

const data: string = readFileSync('9/input.txt', 'utf-8');

const reconstuctedData: string[] = [];

let counter = 0;
for (let i = 0; i < data.length; i++) {
  if (i%2 === 0) {
    for (let j = 0; j < parseInt(data[i]); j++)
      reconstuctedData.push(counter.toString());
    counter++;
  } else
    for (let j = 0; j < parseInt(data[i]); j++)
      reconstuctedData.push('.');
}


let lastIndex = reconstuctedData.length - 1;
for (let i = 0; i < reconstuctedData.length; i++) {
  if (i >= lastIndex)
    break;

  if (reconstuctedData[i] === '.') {
    reconstuctedData[i] = reconstuctedData[lastIndex];
    reconstuctedData[lastIndex] = '.';
    while (reconstuctedData[lastIndex] === '.')
      lastIndex--;
  }
}

const result = reconstuctedData
  .reduce((sum, value, index) => value !== '.' ? sum + (index * parseInt(value)) : sum, 0);
console.log(result);