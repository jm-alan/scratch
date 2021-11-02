const decodeString = str => {
  if (!str.includes('[')) return str;
  let out = '';
  let sliceStart = 0;
  let sliceEnd = 0;
  let depth = 0;
  let repeats;
  while (sliceStart < str.length) {
    if (str[sliceStart].match(/\d/)) {
      depth = 1;
      sliceEnd = sliceStart;
      while (str[sliceEnd] !== '[') sliceEnd++;
      repeats = str.slice(sliceStart, sliceEnd);
      sliceStart = sliceEnd++;
      while (depth) {
        if (str[sliceEnd] === '[') depth++;
        else if (str[sliceEnd] === ']') depth--;
        sliceEnd++;
      }
      out = out + decodeString(str.slice(sliceStart + 1, (sliceStart = sliceEnd) - 1)).repeat(repeats);
    } else {
      while (sliceEnd < str.length && !(str[sliceEnd].match(/\d+/))) sliceEnd++;
    }
    out += decodeString(str.slice(sliceStart, sliceStart = sliceEnd));
  }
  return out;
};

const test1 = '3[a]2[bc]';
const test2 = '3[a2[c]]';
const test3 = '2[abc]3[cd]ef';
const test4 = '100[leetcode]';

console.log(decodeString(test1));
console.log(decodeString(test2));
console.log(decodeString(test3));
console.log(decodeString(test4));
