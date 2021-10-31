const { Worker } = require('worker_threads');
const path = require('path');

(async () => {
  const makePromiseSorter = workerData => new Promise(resolve => (new Worker(path.resolve(__dirname, 'sort.js'), { workerData })).on('message', resolve));
  const makePromiseMerger = workerData => new Promise(resolve => (new Worker(path.resolve(__dirname, 'merge.js'), { workerData })).on('message', resolve));

  const sliceLength = Math.floor(1000000000 / 12);
  const toSort = [];
  for (let i = 0; i < 12; i++) {
    toSort.push(new Array(sliceLength));
    for (let j = 0; j < sliceLength; j++) toSort[i][j] = Math.floor(Math.random() * 1000000000);
    console.log('allocated array', i);
  }
  const sorters = new Array(12);
  console.log('spawning sorters');
  for (let i = 0; i < 12; i++) {
    sorters[i] = makePromiseSorter(toSort[i]);
    toSort[i].splice(0, toSort[i].length);
  }
  console.log('awaiting sorters');
  const sortedSlices = await Promise.all(sorters);
  console.log('sort complete');
  const mergers1 = [];
  for (let i = 0; i < 12; i += 2) {
    mergers1.push(makePromiseMerger({ left: sortedSlices[i], right: sortedSlices[i + 1] }));
    sortedSlices[i].splice(0, sortedSlices[i].length);
    sortedSlices[i + 1].splice(0, sortedSlices[i + 1].length);
  }
  const mergedPhase1 = await Promise.all(mergers1);
  console.log('merge 12 -> 6 complete');
  const mergers2 = [];
  for (let i = 0; i < 6; i += 2) {
    mergers2.push(makePromiseMerger({ left: mergedPhase1[i], right: mergedPhase1[i + 1] }));
    mergedPhase1[i].splice(0, mergedPhase1[i].length);
    mergedPhase1[i + 1].splice(0, mergedPhase1[i + 1].length);
  }
  const mergedPhase2 = await Promise.all(mergers2);
  console.log('merge 6 -> 3 complete');
  const mergedPhase3 = await makePromiseMerger({ left: mergedPhase2[0], right: mergedPhase2[1] });
  console.log('merge 3[0], 3[1] -> 1 complete');
  const final = await makePromiseMerger({ left: mergedPhase2[2], right: mergedPhase3 });
  console.log('final merge complete');
  console.log(final);
})();
