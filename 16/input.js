const path = require("path");
const fs = require("fs");

const hexToBinString = `0 = 0000
1 = 0001
2 = 0010
3 = 0011
4 = 0100
5 = 0101
6 = 0110
7 = 0111
8 = 1000
9 = 1001
A = 1010
B = 1011
C = 1100
D = 1101
E = 1110
F = 1111`;

const hexToBin = {};

hexToBinString
  .split("\n")
  .map((a) => a.split(" = "))
  .forEach((b) => (hexToBin[b[0]] = b[1]));

const input = fs
  .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
  .split("")
  .map((a) => hexToBin[a].split(""))
  .flat();

module.exports = { input };
