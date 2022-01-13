const { input } = require("./input");

let horizontal = 0;
let depth = 0;
for (const item of input) {
  const { command, num } = item;
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
