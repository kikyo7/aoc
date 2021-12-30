const { input } = require("./input");

let horizontal = 0;
let depth = 0;
let aim = 0;
for (let i = 0; i < input.length; i++) {
  const { command, num } = input[i];
  if (command === "forward") {
    horizontal += num;
    depth += aim * num;
  }
  if (command === "down") {
    aim += num;
  }
  if (command === "up") {
    aim -= num;
  }
}

const multiply = horizontal * depth;
console.log(multiply);
