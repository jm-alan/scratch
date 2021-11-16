const { Worker } = require('worker_threads');
const { resolve } = require('path');

[
  new Worker(
    resolve(
      __dirname,
      'linkedList.js'
    ),
    {
      workerData: +process.argv[2]
    }
  ),
  new Worker(
    resolve(
      __dirname,
      'linkedList.js'
    ),
    {
      workerData: +process.argv[2]
    }
  ),
  new Worker(
    resolve(
      __dirname,
      'listFunctions.js'
    ),
    {
      workerData: +process.argv[2]
    }
  ),
  new Worker(
    resolve(
      __dirname,
      'listFunctions.js'
    ),
    {
      workerData: +process.argv[2]
    }
  )
].forEach(worker => worker.on('message', console.log));
