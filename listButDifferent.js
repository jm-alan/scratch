const merge = (left, right) => {
  let nodeStagingLeft = left;
  let nodeStagingRight = right;
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
  if (length < 3) {
    if (left.next && left.val > left.next.val) {
      left.val = left.val + left.next.val;
      left.next.val = left.val - left.next.val;
      left.val = left.val - left.next.val;
    }
  } else {
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
  }
};

const length = +process.argv[2];

const timers = [];
const speeds = [];
for (let i = 0; i < 100; i++) {
  const list = {
    val: Math.round(Math.random() * 1000000000),
    next: null
  };
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
  const time = global.performance.now() - timer;
  const speed = length / time;
  timers.push(time);
  speeds.push(speed);
}
console.log(
  timers.reduce((acc, next) => acc + next) / 100,
  speeds.reduce((acc, next) => acc + next) / 100
);
