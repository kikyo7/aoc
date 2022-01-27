const { input } = require("./input");

let horizontal = 0;
let depth = 0;
let aim = 0;

function recordDistance(needAim) {
  for (const item of input) {
    const { command, num } = item;
    if (command === "forward") {
      horizontal += num;
      if (needAim) {
        depth += aim * num;
      }
    }
    if (command === "down") {
      if (needAim) {
        aim += num;
      } else {
        depth += num;
      }
    }
    if (command === "up") {
      if (needAim) {
        aim -= num;
      } else {
        depth -= num;
      }
    }
  }

  const multiply = horizontal * depth;
  console.log(multiply);
}

const partOne = () => recordDistance();
const partTwo = () => recordDistance(true);

partTwo();
