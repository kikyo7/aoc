const { input } = require("./input");

let count = 0;
for (let i = 0; i < input.length - 1; i++) {
  let currentSum = input[i] + input[i + 1] + input[i + 2];
  let nextSum = input[i + 1] + input[i + 2] + input[i + 3];
  if (nextSum > currentSum) {
    count++;
  }
}

console.log(count);
