const getMax = arr => {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) if (arr[i] > max) max = arr[i];
  return max;
};

const getNthDigitFromEnd = (num, distanceFromEnd) => {
  const lastDigit = num % 10;
  if (!distanceFromEnd) return lastDigit;
  num = (num - lastDigit) / 10;
  return getNthDigitFromEnd(num, distanceFromEnd - 1);
};

const countSort = (arr, digitalMap) => {
  console.log('beginning new count sort');
  const timer = global.performance.now();
  const counter = {};
  for (let i = 0; i < digitalMap.length; i++) {
    const currentEl = digitalMap[i];
    if (counter[currentEl]) counter[currentEl]++;
    else counter[currentEl] = 1;
  }
  let prevKey;
  const counterKeys = Object.keys(counter);
  const keyLen = counterKeys.length;
  for (let i = 0; i < keyLen; i++) {
    if (prevKey) counter[counterKeys[i]] += counter[prevKey];
    prevKey = counterKeys[i];
  }
  let prevVal = 0;
  for (let i = 0; i < keyLen; i++) {
    const stash = counter[counterKeys[i]];
    counter[counterKeys[i]] = prevVal;
    prevVal = stash;
  }
  const output = new Array(digitalMap.length);
  for (let i = 0; i < digitalMap.length; i++) {
    output[counter[digitalMap[i]]] = arr[i];
    counter[digitalMap[i]]++;
  }
  for (let i = 0; i < digitalMap.length; i++) arr[i] = output[i];
  console.log('count sort completed', global.performance.now() - timer);
};

const radixSort = arr => {
  let toReduce = getMax(arr);
  let runs = 0;
  while (toReduce) {
    runs++;
    toReduce = (toReduce - (toReduce % 10)) / 10;
  }
  for (let i = 0; i < runs; i++) {
    const timer = global.performance.now();
    const digitMap = arr.map(el => getNthDigitFromEnd(el, i));
    console.log('digital map constructed', global.performance.now() - timer);
    countSort(arr, digitMap);
  }
};

for (let i = 9; i <= 10000000; i *= 10) {
  console.log('Running with variance up to', i);
  const someArr = new Array(100000000);
  for (let j = 0; j < 100000000; j++) someArr[j] = Math.floor(Math.random() * i);
  const copy = [...someArr];
  console.log('Both arrays allocated.');
  console.log('Beginning radix sort.');
  let timer = global.performance.now();
  radixSort(someArr);
  console.log(global.performance.now() - timer);
  console.log('Beginning builtin sort.');
  timer = global.performance.now();
  copy.sort((a, b) => a - b);
  console.log(global.performance.now() - timer);
}
