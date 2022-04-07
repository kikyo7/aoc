const path = require("path");
const fs = require("fs");

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .split("\n")
  .map((line) => line.split(" | "))
  .map(([patterns, outputs]) => [patterns.split(" "), outputs.split(" ")]);

module.exports = { input };
