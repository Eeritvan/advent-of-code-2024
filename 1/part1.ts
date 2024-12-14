import { readFileSync } from 'fs'

const data: string = readFileSync('1/input.txt', 'utf-8')
const parsedData: string[] = data.split(/\s+/);

const left_side: string[] = (parsedData.filter((_, index) => index % 2 === 0)).sort()
const right_side: string[] = (parsedData.filter((_, index) => index % 2 !== 0)).sort()

let counter: number = 0
for (let i = 0; i < left_side.length; i++) {
  const left_value = Number(left_side[i])
  const right_value = Number(right_side[i])
  counter += Math.abs(left_value - right_value)
} 

console.log('part 1: ' + counter)