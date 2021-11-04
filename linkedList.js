class Node {
  constructor (val) {
    this.val = val;
    this.next = undefined;
  }
}

class List {
  constructor (head, tail) {
    this.length = 0;
    this.head = head;
    this.tail = tail;
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
  }

  mergeSort () {
    if (this.length < 2) return;
    const half = this.length / 2;
    const leftLength = Math.floor(half);
    const left = new List();
    while (left.length < leftLength) left.decapitate(this);
    const right = new List(this.head, this.tail);
    right.length = Math.ceil(half);
    this.length = 0;
    right.mergeSort();
    left.mergeSort();
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
      if (current.val > current.next.val) {
        return false;
      }
      current = current.next;
    }
    return true;
  }
}
const globalTimer = global.performance.now();
const timers = [];
const speeds = [];
const runs = +process.argv[2];
for (let i = 0; i < 30; i++) {
  const list = new List();
  for (let j = 0; j < runs; j++) list.pushNode(new Node(Math.round(Math.random() * 1000000000)));
  let timer = global.performance.now();
  list.mergeSort();
  timers.push(timer = global.performance.now() - timer);
  if (!List.isSorted(list)) throw new Error('SORT FAILED');
  speeds.push(runs / timer);
}
console.log(timers.reduce((acc, next) => acc + next) / 30, speeds.reduce((acc, next) => acc + next) / 30);
console.log(global.performance.now() - globalTimer);
