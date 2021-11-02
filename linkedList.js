const util = require('util');

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
    if (this.tail) {
      this.tail.next = list.head;
      this.tail = this.tail.next;
    } else {
      this.tail = list.head;
      this.head = this.tail;
    }
    list.head = list.head.next;
    list.length--;
    this.length++;
  }

  sort () {
    if (this.length < 2) return;
    const half = this.length / 2;
    const leftLength = Math.floor(half);
    const rightLength = Math.ceil(half);
    let currPos = 1;
    let current = this.head;
    const left = new List();
    left.head = current;
    while (++currPos <= leftLength) current = current.next;
    left.tail = current;
    left.length = leftLength;
    current && (current = current.next);
    const right = new List();
    right.head = current;
    right.tail = this.tail;
    right.length = rightLength;
    this.head = undefined;
    this.tail = undefined;
    this.length = 0;
    left.sort();
    right.sort();
    List.merge(left, right, this);
  }

  static merge (list1, list2, list3) {
    while (list1.length && list2.length) {
      if (list1.head.val < list2.head.val) list3.decapitate(list1);
      else list3.decapitate(list2);
    }
    if (list1.length) {
      list3.tail.next = list1.head;
      list3.tail = list1.tail;
      list3.length += list1.length;
      list1.length = 0;
      list1.head = undefined;
      list1.tail = undefined;
    } else if (list2.length) {
      list3.tail.next = list2.head;
      list3.tail = list2.tail;
      list3.length += list2.length;
      list2.length = 0;
      list2.head = undefined;
      list2.tail = undefined;
    }
  }

  static isSorted (list) {
    let current = list.head;
    let currPos = 1;
    while (currPos++ < list.length) {
      if (current.val > current.next.val) return false;
      current = current.next;
    }
    return true;
  }

  [util.inspect.custom] (_depth, _opts) {
    let current = this.head;
    let out = '';
    while (current) {
      out += current.val + ' ';
      current = current.next;
    }
    return {
      head: this.head && this.head.val,
      tail: this.tail && this.tail.val,
      length: this.length,
      run: out
    };
  }
}
const listTimes = [];
const arrTimes = [];
const runs = +process.argv[2];
for (let i = 0; i < 50; i++) {
  const list = new List();
  for (let j = 0; j < runs; j++) list.pushNode(new Node(Math.round(Math.random() * 1000000000)));
  let timer = global.performance.now();
  list.sort();
  listTimes.push(timer = global.performance.now() - timer);
  console.log(`List time: ${timer} total, speed: ${runs / timer} ints/ms`);
}
for (let i = 0; i < 50; i++) {
  const arr = new Array(runs);
  for (let j = 0; j < runs; j++) arr[j] = Math.floor(Math.random * 1000000000);
  let timer = global.performance.now();
  arr.sort((a, b) => a - b);
  arrTimes.push(timer = global.performance.now() - timer);
  console.log(`Array time: ${timer} total, speed: ${runs / timer} ints/ms`);
}
