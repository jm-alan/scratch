import util from 'util';

class Node {
  constructor (val) {
    this.val = val;
  }

  append (node) {
    this.next = node;
  }
}

class List {
  constructor () {
    this.length = 0;
    this.head = undefined;
    this.tail = undefined;
  }

  pushNode (node) {
    this.tail && (this.tail.append(node) || (this.tail = this.tail.next));
    this.tail || ((this.tail = node) && (this.head = this.tail));
    ++this.length;
  }

  pushVal (val) {
    this.tail && (this.tail.append(new Node(val)) || (this.tail = this.tail.next));
    this.tail || ((this.tail = new Node(val)) && (this.head = this.tail));
    ++this.length;
  }

  shift () {
    if (!this.head) return;
    const staging = this.head;
    this.head = this.head.next;
    if (!this.head) this.tail = undefined;
    staging.next = undefined;
    if (--this.length === 1) {
      this.head = this.tail;
      this.tail.next = undefined;
    }
    return staging;
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
    currPos = 1;
    current && (current = current.next);
    const right = new List();
    right.head = current;
    while (++currPos <= rightLength) current = current.next;
    right.tail = current;
    right.length = rightLength;
    this.head = undefined;
    this.tail = undefined;
    this.length = 0;
    left.sort();
    right.sort();
    List.merge(left, right, this);
  }

  static merge (list1, list2, list3 = new List()) {
    while (list1.length && list2.length) {
      if (list1.head.val < list2.head.val) list3.pushNode(list1.shift());
      else list3.pushNode(list2.shift());
    }
    while (list1.length && !list3.pushNode(list1.shift()));
    while (list2.length && !list3.pushNode(list2.shift()));
    return list3;
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

const list = new List();
let timer = global.performance.now();
for (let i = 0; i < 10000000; i++) list.pushVal(Math.round(Math.random() * 10000000));
console.log('Allocation complete, sorting.', timer = global.performance.now() - timer);
list.sort();
console.log('Sort complete, validating.', timer = global.performance.now() - timer);
console.log('Validation complete', global.performance.now() - timer, List.isSorted(list));

// console.log(list1, list2, list3);