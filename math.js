const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
if (isMainThread) {
  [
    new Worker(__filename, { workerData: { method: 'hypot', ops: 5000000000 } }),
    new Worker(__filename, { workerData: { method: 'dub', ops: 5000000000 } }),
    new Worker(__filename, { workerData: { method: 'pow', ops: 5000000000 } })
  ].forEach(worker => worker.on('message', console.log));
} else {
  const { method, ops } = workerData;
  const num1 = Math.floor(Math.random(1000000000));
  const num2 = Math.floor(Math.random(1000000000));
  let timer;
  switch (method) {
    case 'dub':
      timer = global.performance.now();
      for (let i = 0; i < ops; i++) Math.sqrt(num1 ** 2 + num2 ** 2);
      parentPort.postMessage({
        name: 'Dub',
        ops,
        runTime: (timer = global.performance.now() - timer),
        speed: `${ops / timer} ops/ms`
      });
      break;
    case 'hypot':
      timer = global.performance.now();
      for (let i = 0; i < ops; i++) Math.hypot(num1, num2);
      parentPort.postMessage({
        name: 'Hypot',
        ops,
        runTime: (timer = global.performance.now() - timer),
        speed: `${ops / timer} ops/ms`
      });
      break;
    case 'pow':
      timer = global.performance.now();
      for (let i = 0; i < ops; i++) Math.sqrt(Math.pow(num1, 2) + Math.pow(num2, 2));
      parentPort.postMessage({
        name: 'Pow',
        ops,
        runTime: (timer = global.performance.now() - timer),
        speed: `${ops / timer} ops/ms`
      });
      break;
  }
}
