const path = require("path");
const fs = require("fs");

const [cords, foldsAt] = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .split("\n\n")
  .map((part) => part.split("\n"));

module.exports = { cords, foldsAt };
