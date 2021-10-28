import { Worker, isMainThread, parentPort } from 'node:worker_threads';

if (isMainThread) {
  const all = [];
  let lock = 0;
  [
    new Worker(new URL(import.meta.url)),
    new Worker(new URL(import.meta.url)),
    new Worker(new URL(import.meta.url)),
    new Worker(new URL(import.meta.url)),
    new Worker(new URL(import.meta.url)),
    new Worker(new URL(import.meta.url))
  ].forEach(worker => worker.on('message', msg => {
    if (msg) all.push(msg);
    else if (lock === 5) console.log(all.every((res, idx) => res || console.log('Failure at test', idx)));
    else lock++;
  }));
} else {
  for (let i = 0; i < 1000; i++) {
    const n = 10_000;
    let min;
    let max;

    // write a function with the expected number of operations
    function funcWithSameOps () {
      let sum;
      for (let i = 0; i < n; i++) {
        sum += 1;
      }
      return sum;
    }

    // finds the min and max times of N time with a function that has the same operations
    (function findNTime () {
      const tests = [];
      for (let i = 0; i < n; i++) {
        const startTime = Date.now();
        funcWithSameOps();
        const endTime = Date.now();
        const runTime = endTime - startTime;
        tests.push(runTime);
      }
      max = Math.max(...tests);
      min = Math.min(...tests);
    })();

    // finds the run time of a callback
    function findTimeOfFunc (cb, n) {
      const startTime = Date.now();
      cb(n);
      const endTime = Date.now();
      const runTime = endTime - startTime;
      return runTime;
    }

    // test func1
    function addNumsInN (n) {
      let sum = 0;

      for (let i = 0; i <= n; i++) {
        sum += i;
      }

      return sum;
    }
    // test func 2
    function addNumsInSquare (n) {
      let sum = 0;

      for (let i = 0; i <= n; i++) {
        sum += i;
        for (let j = 0; j <= n; j++) {
          sum += j;
        }
      }

      return sum;
    }

    // tests func1 and func2
    const res1 = findTimeOfFunc(addNumsInN, n);
    const res2 = findTimeOfFunc(addNumsInSquare, n);

    // func1 passes func2 does not (usually??)
    const firstTrue = (res1 >= min && res1 <= max) === true;
    const secondFalse = (res2 >= min && res2 <= max) === false;
    parentPort.postMessage([firstTrue, secondFalse].every(a => a));
  }
  parentPort.postMessage(null);
}
