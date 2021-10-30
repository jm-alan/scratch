const { workerData: { left, right }, parentPort } = require('worker_threads');

const merge = (left, right) => {
  const out = [];
  let ptrL = 0;
  let ptrR = 0;
  while (ptrL < left.length && ptrR < right.length) {
    if (left[ptrL] < right[ptrR]) out.push(left[ptrL++]);
    else out.push(right[ptrR++]);
  }
  while (ptrL < left.length) out.push(left[ptrL++]);
  while (ptrR < right.length) out.push(right[ptrR++]);
  return out;
};

parentPort.postMessage(merge(left, right));
