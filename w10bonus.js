const kth = (str, k) => {
  const counter = {};
  const uniqueChars = new Set();
  for (let i = 0; i < str.length; i++) {
    uniqueChars.add(str[i]);
    if (counter[str[i]]) counter[str[i]]++;
    else counter[str[i]] = 1;
  }
  const frequencies = [];
  uniqueChars.forEach((val) => (frequencies[counter[val]] = val));
  let encounteredLetters = 0;
  for (let i = frequencies.length; i >= 0; i--) {
    if (frequencies[i]) encounteredLetters++;
    if (encounteredLetters === k) return frequencies[i];
  }
};

console.log(kth('abbaca', 1)); //  => 'a'
console.log(kth('aaabbc', 2)); //  => 'b'
console.log(kth('aaabbc', 3)); //  => 'c'
