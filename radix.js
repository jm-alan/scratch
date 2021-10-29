// // A function to do counting sort of arr[] according to
// // the digit represented by exp.
// function countSort (arr, n, exp) {
//   const output = new Array(n); // output array
//   const count = new Array(10);
//   for (let i = 0; i < 10; i++) count[i] = 0;
//   // Store count of occurrences in count[]
//   for (let i = 0; i < n; i++) count[Math.floor(arr[i] / exp) % 10]++;

//   // Change count[i] so that count[i] now contains
//   // actual position of this digit in output[]
//   for (let i = 1; i < 10; i++) count[i] += count[i - 1];

//   // Build the output array
//   for (let i = n - 1; i >= 0; i--) {
//     output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];
//     count[Math.floor(arr[i] / exp) % 10]--;
//   }

//   // Copy the output array to arr[], so that arr[] now
//   // contains sorted numbers according to current digit
//   for (let i = 0; i < n; i++) arr[i] = output[i];
// }

// // The main function to that sorts arr[] of size n using
// // Radix Sort
// function radixsort (arr, n) {
//   // Find the maximum number to know number of digits
//   const m = arr.reduce((acc, next) => acc > next ? acc : next, arr[0]);

//   // Do counting sort for every digit. Note that
//   // instead of passing digit number, exp is passed.
//   // exp is 10^i where i is current digit number
//   for (let exp = 1; Math.floor(m / exp) > 0; exp *= 10) countSort(arr, n, exp);
// }

const countSort = (arr, map) => {
  const counter = {};
  for (let i = 0; i < arr.length; i++) {
    const currentEl = arr[i];
    if (counter[arr[i]]) counter[arr[i]]++;
    else counter[arr[i]] = 1;
  }
  let prevKey;
  const counterKeys = Object.keys(counter);
  for (let i = 0; i < counterKeys.length; i++) {
    const currentKey = counterKeys[i];
    if (prevKey) counter[currentKey] += counter[prevKey];
    prevKey = currentKey;
  }
  let prevVal = 0;
  for (let i = 0; i < counterKeys.length; i++) {
    const currentKey = counterKeys[i];
    const stash = counter[currentKey];
    counter[currentKey] = prevVal;
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
  console.log('entered radix sort');
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
  console.log('allocated dispose map');
  for (let i = 0; i < runs; i++) {
    for (let j = 0; j < arrLen; j++) {
      const tenPow = Math.pow(10, i);
      disposeMap[j] = (arr[j] - (arr[j] % tenPow)) / tenPow;
    }
    countSort(disposeMap, arr, arrMax);
  }
};

for (let i = 33554429; i <= 33554433; i += 1) {
  console.log('input length', i);
  const arr = new Array(i);
  for (let j = 0; j < i; j++) arr[j] = Math.floor(Math.random() * 100000000);
  const copy = [...arr];
  console.log('Allocation complete, radix sort starting');
  let timer = global.performance.now();
  radixSort(arr, i);
  console.log(global.performance.now() - timer);
  console.log('Radix sort complete, builtin sort starting');
  timer = global.performance.now();
  copy.sort((a, b) => a - b);
  console.log(global.performance.now() - timer, '\n');
}
