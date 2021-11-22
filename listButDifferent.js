const merge = (left, right) => {
  let nodeStagingLeft = left;
  let nodeStagingRight = right;
  let valStaging = 0;
  while (left && right) {
    if (!(left.val < right.val)) {
      left.val = left.val + right.val;
      right.val = left.val - right.val;
      left.val = left.val - right.val;
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
    const rightLength = length >> 1;
    length = length - rightLength;
    let current = left;
    let currLength = 1;
    while (currLength++ < length) current = current.next;
    const right = current.next;
    current.next = null;
    sort(left, length);
    sort(right, rightLength);
    merge(left, right);
  }
};

const inputLength = +process.argv[2];
for (let length = 50000; length < inputLength; length += 50000) {
  const listTimers = [];
  const listSpeeds = [];
  for (let i = 0; i < 1000; i++) {
    const list = {
      val: Math.round(Math.random() * 1000000000),
      next: null
    };
    let current = list;
    let currLength = 1;
    while (currLength++ < length && (current.next = { val: Math.round(Math.random() * 1000000000), next: null }) && (current = current.next));
    const timer = global.performance.now();
    sort(list, length);
    const time = global.performance.now() - timer;
    const speed = length / time;
    listTimers.push(time);
    listSpeeds.push(speed);
  }

  const arrTimers = [];
  const arrSpeeds = [];
  for (let i = 0; i < 1000; i++) {
    const arr = [];
    for (let i = 0; i < length; i++) arr.push(Math.round(Math.random() * 1000000000));
    const timer = global.performance.now();
    arr.sort((a, b) => a - b);
    const time = global.performance.now() - timer;
    const speed = length / time;
    arrTimers.push(time);
    arrSpeeds.push(speed);
  }
  console.log('Input length:', length);
  console.log(
    'List sort time:',
    +(listTimers.reduce((acc, next) => acc + next) / 1000).toFixed(6),
    'ints/ms:',
    +(listSpeeds.reduce((acc, next) => acc + next) / 1000).toFixed(6)
  );
  console.log(
    'Array sort time:',
    +(arrTimers.reduce((acc, next) => acc + next) / 1000).toFixed(6),
    'ints/ms:',
    +(arrSpeeds.reduce((acc, next) => acc + next) / 1000).toFixed(6)
  );
}
