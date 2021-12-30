const { input } = require("./input");

let horizontal = 0;
let depth = 0;
for (let i = 0; i < input.length; i++) {
  const { command, num } = input[i];
  if (command === "forward") {
    horizontal += num;
  }
  if (command === "down") {
    depth += num;
  }
  if (command === "up") {
    depth -= num;
  }
}

const multiply = horizontal * depth;
console.log(multiply);
