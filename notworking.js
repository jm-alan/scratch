const isConsecutive = function (nums) {
  const separatedBy = 1;

  for (let i = 0; i < nums.length - 1; i++) {
    const num1 = nums[i];
    const num2 = nums[i + 1];

    if (num1 + separatedBy !== num2) {
      return false;
    }
  }
  return true;
};

const threeIncreasing = function (nums) {
  for (let i = 0; i < nums.length - 2; i++) {
    const consecutiveNums = [];
    for (let j = 0; j < 4; j++) {
      consecutiveNums.push(nums[i + j]);
    }

    if (isConsecutive(consecutiveNums)) {
      return true;
    }
  }
  return false;
};

console.log(threeIncreasing([5, 1, 2, 3, 6])); // true
console.log(threeIncreasing([5, 1, 2, 4, 6])); // false
