import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'process';

const rl = readline.createInterface({ input, output });

let answer = rl.question('Keep going?\n');

while (['y', 'Y'].includes(await answer)) answer = rl.question('Keep going?\n');

rl.close();
