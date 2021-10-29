const unsorted = [101, 4, 1, 207, 7, 5, 2, 6, 4, 7];
const countSort = (arr, map, arrMax) => {
  const counter = {};
  for (let i = 0; i < arr.length; i++) {
    if (counter[arr[i]]) counter[arr[i]]++;
    else counter[arr[i]] = 1;
  }
  let prevKey;
  for (const key in counter) {
    if (prevKey) counter[key] += counter[prevKey];
    prevKey = key;
  }
  let prevVal = 0;
  for (const key in counter) {
    const stash = counter[key];
    counter[key] = prevVal;
    prevVal = stash;
  }
  const output = new Array(arr.length);
  for (let i = 0; i < arr.length; i++) {
    output[counter[arr[i]]] = map[i];
    counter[arr[i]]++;
  }
  for (let i = 0; i < arr.length; i++) map[i] = output[i];
};

const radixSort = arr => {
  const arrMax = arr.reduce((acc, next) => acc > next ? acc : next, arr[0]);
  const arrLen = arr.length;
  let runs = 0;
  let toReduce = arrMax;
  while (toReduce) {
    runs++;
    toReduce = (toReduce - (toReduce % 10)) / 10;
  }
  // the reduced number % 10 ^ remaining runs
  const disposeMap = new Array(arrLen);
  for (let i = 0; i < runs; i++) {
    for (let j = 0; j < arrLen; j++) {
      const tenPow = Math.pow(10, i);
      disposeMap[j] = (arr[j] - (arr[j] % tenPow)) / tenPow;
    }
    countSort(disposeMap, arr, arrMax);
  }
};

console.log(unsorted);
radixSort(unsorted);
console.log(unsorted);
// countSort(unsorted);
