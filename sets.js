const set1 = new Set();
const set2 = new Set();
let multiplier = 1.676;
for (let i = 0; i < 1000000; i++) {
  multiplier += 0.0001;
  const largeSize = Math.round(10000000 * multiplier);
  const smallSize = Math.round(largeSize / 2);
  const compArr = new Array(largeSize);
  compArr.fill(0);
  let timerInit = global.performance.now();
  Array.from(compArr);
  const compTimer = global.performance.now() - timerInit;
  for (let i = 0; i < smallSize; i++) set1.add(i);
  for (let i = 0; i < largeSize; i++) set2.add(i);
  timerInit = global.performance.now();
  Array.from(set1);
  const set1Timer = global.performance.now() - timerInit;
  timerInit = global.performance.now();
  Array.from(set2);
  const set2Timer = global.performance.now() - timerInit;
  console.log(multiplier, compTimer, set1Timer, set2Timer);
}
