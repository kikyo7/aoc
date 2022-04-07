const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .toString()
  .split("\n")
  .map((line) => {
    const [command, num] = line.split(" ");
    return {
      command,
      num: parseInt(num),
    };
  });

module.exports = { input };
