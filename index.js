/* eslint-disable no-extend-native */

// const flatten = item => Array.isArray(item)
//   ? item.reduce((acc, next) => acc.concat(...flatten(next)), [])
//   : [item];

// console.log(
//   flatten([[1, [2, [3, 4, 5, [6, 7], [8, 9]]]], [10, 11, 12]])
// );
// console.log(flatten([1]));
import fetch from 'node-fetch';
const url = 'https://www.kayak.com/h/mobileapis/directory/airlines/homework';

(async () => {
  const res = await fetch(url);
  console.log((await res.text()).slice(0, 100));
})();
