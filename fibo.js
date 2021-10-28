const target = BigInt(process.argv[2]);

let timer = globalThis.performance.now();

const fiboSlice = [1n, 1n, 2n];

if (target < 1n) console.log(null);

if (target <= 3n) console.log(fiboSlice[target - 1n]);
else {
  for (let i = 4n; i <= target; i++) {
    fiboSlice[0] = fiboSlice[1];
    fiboSlice[1] = fiboSlice[2];
    fiboSlice[2] = fiboSlice[0] + fiboSlice[1];
  }
  console.log(fiboSlice[2]);
  console.log('Calculated', target, 'Fibonacci numbers in', (timer = globalThis.performance.now() - timer), 'ms');
  let moduloReduce = fiboSlice[2];
  let digits = 0n;
  while (moduloReduce > 0n) {
    moduloReduce /= 10n;
    digits++;
  }
  console.log('Reduced to calculate a total of', digits, 'digits in', globalThis.performance.now() - timer, 'ms');
}
