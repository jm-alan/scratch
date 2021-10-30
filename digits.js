const getNthDigitFromEnd = (num, distanceFromEnd) => {
  const lastDigit = num % 10;
  if (!distanceFromEnd) return lastDigit;
  num = (num - lastDigit) / 10;
  return getNthDigitFromEnd(num, distanceFromEnd - 1);
};
const someNum = 8293759287345;
console.log(getNthDigitFromEnd(someNum, 20));
