const { workerData, parentPort } = require('worker_threads');

class Node {
  constructor (val) {
    this.val = val;
    this.next = undefined;
  }
}

class List {
  constructor () {
    this.length = 0;
    this.head = undefined;
    this.tail = undefined;
  }

  pushNode (node) {
    if (this.tail) {
      this.tail.next = node;
      this.tail = this.tail.next;
    } else {
      this.tail = node;
      this.head = this.tail;
    }
    this.length++;
  }

  decapitate (list) {
    if (this.length) this.tail.next = list.head;
    else this.head = list.head;
    this.tail = list.head;
    list.head = list.head.next;
    this.tail.next = undefined;
    list.length--;
    this.length++;
    if (list.length === 0) list.tail = undefined;
  }

  mergeSort () {
    if (this.length < 2) return;
    const half = this.length / 2;
    const leftLength = Math.floor(half);
    const left = new List();
    const right = new List();
    while (left.length < leftLength) left.decapitate(this);
    right.head = this.head;
    right.tail = this.tail;
    right.length = Math.ceil(half);
    this.length = 0;
    right.mergeSort();
    left.mergeSort();
    List.merge(left, right, this);
  }

  static merge (list1, list2, list3) {
    while (list1.length && list2.length) (list1.head.val < list2.head.val) ? list3.decapitate(list1) : list3.decapitate(list2);
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
  }

  static isSorted (list) {
    let current = list.head;
    while (current.next) {
      if (current.val > current.next.val) return false;
      current = current.next;
    }
    return true;
  }
}

const globalTimer = global.performance.now();
const timers = [];
const speeds = [];
const runs = workerData;
for (let i = 0; i < 100; i++) {
  const list = new List();
  for (let j = 0; j < runs; j++) list.pushNode(new Node(Math.round(Math.random() * 1000000000)));
  let timer = global.performance.now();
  list.mergeSort();
  timers.push(timer = global.performance.now() - timer);
  speeds.push(runs / timer);
}

parentPort.postMessage({
  'List type': 'class',
  'Node type': 'class',
  'Function type': 'List methods',
  'Average sort time': timers.reduce((acc, next) => acc + next) / 100,
  'Average ints/ms': speeds.reduce((acc, next) => acc + next) / 100,
  'Total time': global.performance.now() - globalTimer
});
