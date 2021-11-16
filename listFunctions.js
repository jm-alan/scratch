const { workerData, parentPort } = require('worker_threads');

global.pushNode = (list, node) => {
  if (list.tail) {
    list.tail.next = node;
    list.tail = list.tail.next;
  } else {
    list.tail = node;
    list.head = list.tail;
  }
  list.length++;
};

global.decapitate = (consumptor, list) => {
  if (consumptor.length) consumptor.tail.next = list.head;
  else consumptor.head = list.head;
  consumptor.tail = list.head;
  list.head = list.head.next;
  consumptor.tail.next = undefined;
  list.length--;
  consumptor.length++;
  if (list.length === 0) list.tail = undefined;
};

global.merge = (list1, list2, list3) => {
  while (list1.length && list2.length) (list1.head.val < list2.head.val) ? global.decapitate(list3, list1) : global.decapitate(list3, list2);
  if (list1.length) {
    list3.tail.next = list1.head;
    list3.tail = list1.tail;
    list3.length += list1.length;
    list1.head = undefined;
    list1.tail = undefined;
  } else if (list2.length) {
    list3.tail.next = list2.head;
    list3.tail = list2.tail;
    list3.length += list2.length;
    list2.head = undefined;
    list2.tail = undefined;
  }
};

global.mergeSort = list => {
  if (list.length < 2) return;
  const half = list.length / 2;
  const leftLength = global.Math.floor(half);
  const left = {
    length: 0,
    head: undefined,
    tail: undefined
  };
  const right = {
    length: 0,
    head: undefined,
    tail: undefined
  };
  while (left.length < leftLength) global.decapitate(left, list);
  right.head = list.head;
  right.tail = list.tail;
  right.length = global.Math.ceil(half);
  list.length = 0;
  global.mergeSort(left);
  global.mergeSort(right);
  global.merge(left, right, list);
};

const globalTimer = global.performance.now();
const timers = [];
const speeds = [];
const runs = workerData;
for (let i = 0; i < 100; i++) {
  const list = {
    length: 0,
    head: undefined,
    tail: undefined
  };
  for (let j = 0; j < runs; j++) global.pushNode(list, { val: (Math.round(Math.random() * 1000000000)), next: undefined });
  let timer = global.performance.now();
  global.mergeSort(list);
  timers.push(timer = global.performance.now() - timer);
  speeds.push(runs / timer);
}
parentPort.postMessage({
  'List type': 'POJO',
  'Node type': 'POJO',
  'Function type': 'external',
  'Average sort time': timers.reduce((acc, next) => acc + next) / 100,
  'Average ints/ms': speeds.reduce((acc, next) => acc + next) / 100,
  'Total time': global.performance.now() - globalTimer
});
