import { readFileSync } from 'fs';

const games: string[] = readFileSync('13/input.txt', 'utf-8').trim().split('\n\n');

const result = games.reduce((acc, game) => {
  const parts: string[] = game.split('\n');
  const buttonA = parts[0].match(/\d+/g)!.map(Number);
  const buttonB = parts[1].match(/\d+/g)!.map(Number);
  const prize = parts[2].match(/\d+/g)!.map(Number);

  const pressesA: number = (prize[1]*buttonB[0] - prize[0]*buttonB[1]) / (buttonA[1]*buttonB[0] - buttonA[0]*buttonB[1]);
  const pressesB: number = (prize[1] - pressesA * buttonA[1]) / buttonB[1];

  if (pressesA % 1 == 0 && pressesB % 1 == 0 && pressesA <= 100 && pressesB <= 100) {
    return acc + (3 * pressesA + pressesB);
  }
  return acc;
}, 0);

console.log(result);
