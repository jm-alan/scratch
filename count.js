const countSort = (arr) => {
  const counter = {};
  for (let i = 0; i < arr.length; i++) {
    const currentEl = arr[i];
    if (counter[currentEl]) counter[currentEl]++;
    else counter[currentEl] = 1;
  }
  let prevKey;
  const counterKeys = Object.keys(counter);
  for (let i = 0; i < counterKeys.length; i++) {
    if (prevKey) counter[counterKeys[i]] += counter[prevKey];
    prevKey = counterKeys[i];
  }
  let prevVal = 0;
  for (let i = 0; i < counterKeys.length; i++) {
    const stash = counter[counterKeys[i]];
    counter[counterKeys[i]] = prevVal;
    prevVal = stash;
  }
  const output = new Array(arr.length);
  for (let i = 0; i < arr.length; i++) {
    output[counter[arr[i]]] = arr[i];
    counter[arr[i]]++;
  }
  for (let i = 0; i < arr.length; i++) arr[i] = output[i];
};

const someArr = new Array(100);
for (let i = 0; i < 100; i++) someArr[i] = Math.floor(Math.random() * 1000);
countSort(someArr);
console.log(someArr);
