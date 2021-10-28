const target: number = +process.argv[2];

console.log('timer started NOW');

let timer: number = globalThis.performance.now();

const fiboSlice: bigint[] = [1n, 1n, 2n];

if (!target || target < 1) console.log(null);
else if (target <= 3) console.log(fiboSlice[target - 1]);
else {
  for (let i = 4n; i <= target; i++) {
    fiboSlice[0] = fiboSlice[1];
    fiboSlice[1] = fiboSlice[2];
    fiboSlice[2] = fiboSlice[0] + fiboSlice[1];
  }
  console.log(fiboSlice[2]);
  console.log('Calculated position', target, 'in the Fibonacci sequence in', (timer = globalThis.performance.now() - timer), 'ms');
  let moduloReduce = fiboSlice[2];
  let digits = 0n;
  while (moduloReduce > 0n) {
    moduloReduce /= 10n;
    digits++;
  }
  console.log('Reduced to count a total of', digits, 'digits in', globalThis.performance.now() - timer, 'ms');
}
