import { readFileSync } from 'fs';

type Robot = {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const lines: string[] = readFileSync('14/input.txt', 'utf-8').split('\n');
const robots: Robot[] = [];

for (const line of lines) {
  const [posPart, velPart] = line.split('v=');
  const [px, py] = posPart.replace('p=', '').split(',').map(Number);
  const [vx, vy] = velPart.split(',').map(Number);
  robots.push({ x: px, y: py, vx: vx, vy: vy });
}

for (let i = 0; i < 100; i++) {
  for (const robot of robots) {
    robot.x = (robot.x + robot.vx + 101) % 101;
    robot.y = (robot.y + robot.vy + 103) % 103;
  }
}

const midX = Math.floor(101 / 2);
const midY = Math.floor(103 / 2);

const quadrants = [0, 0, 0, 0];
for (const robot of robots) {
  const x = Math.floor(robot.x);
  const y = Math.floor(robot.y);

  if (x < midX && y < midY) quadrants[0]++;
  if (x > midX && y < midY) quadrants[1]++;
  if (x < midX && y > midY) quadrants[2]++;
  if (x > midX && y > midY) quadrants[3]++;
}
console.log(quadrants.reduce((a, b) => a * b));