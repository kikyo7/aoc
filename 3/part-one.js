const { input } = require("./input");

/**
 * - 遍历一遍列表，计算出所需的所有值
 * - count 为二维数组
 * - ex: count[0][1] = 第一列值为1的个数
 */

let count = [];
for (const line of input) {
  for (let column = 0; column < line.length; column++) {
    const val = line[column];
    if (!count[column]) {
      count[column] = [0, 0];
    }
    count[column][val]++;
  }
}

let gamma = "";
let epsilon = "";
for (let i = 0; i < count.length; i++) {
  const zeroNum = count[i][0];
  const oneNum = count[i][1];

  gamma = zeroNum > oneNum ? gamma + "0" : gamma + "1";
  epsilon = zeroNum > oneNum ? epsilon + "1" : epsilon + "0";
}

const gammaRate = parseInt(gamma, 2);
const epsilonRate = parseInt(epsilon, 2);
console.log(gammaRate * epsilonRate);
