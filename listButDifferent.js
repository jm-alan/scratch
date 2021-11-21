const merge = (left, right) => {
  let nodeStagingLeft = left.next;
  let nodeStagingRight = right.next;
  let valStaging = 0;
  while (left && right) {
    if (!(left.val < right.val)) {
      valStaging = left.val;
      left.val = right.val;
      right.val = valStaging;
      nodeStagingLeft = left.next;
      nodeStagingRight = right.next;
      left.next = right;
      right.next = nodeStagingLeft;
      right = nodeStagingRight;
    }
    nodeStagingLeft = left;
    left = left.next;
  }
  if (right) nodeStagingLeft.next = right;
};

const sort = (left, length) => {
  if (length < 2) return;

  const leftLength = Math.ceil(length / 2);
  const rightLength = length - leftLength;
  let current = left;
  let currLength = 1;
  while (currLength++ < leftLength) current = current.next;
  const right = current.next;
  current.next = null;
  sort(left, leftLength);
  sort(right, rightLength);
  merge(left, right);
};

const isSorted = list => {
  let counter = 0;
  while (list.next && list.val <= list.next.val && (list = list.next) && ++counter);
  return [!list.next, counter];
};

const length = +process.argv[2];

const list = {
  val: Math.round(Math.random() * 1000000000),
  next: null
};
const timers = [];
for (let i = 0; i < 50; i++) {
  let current = list;
  let currLength = 1;
  while (currLength++ < length) {
    current.next = {
      val: Math.round(Math.random() * 1000000000),
      next: null
    };
    current = current.next;
  }

  const timer = global.performance.now();
  sort(list, length);
  const fin = global.performance.now() - timer;
  console.log(fin);
  timers.push(fin);
  // current = list;
  // while (current) {
  //   console.log(current);
  //   current = current.next;
  // }
  console.log(isSorted(list));
}
console.log(timers.reduce((acc, next) => acc + next) / 50);
