const { workerData, parentPort } = require('worker_threads');

parentPort.postMessage(workerData.sort((a, b) => a - b));
