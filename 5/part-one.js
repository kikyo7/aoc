const { input } = require("./input");

let sampleData = [];
// 初始化一个1000*1000的二维数组
let resArray = new Array(1000).fill(0).map(() => new Array(1000).fill(0));

for (let i = 0; i < input.length; i++) {
  const val = input[i];
  const x = val[0].split(",");
  const y = val[1].split(",");
  sampleData[i] = [];
  if (parseInt(x[0]) !== parseInt(y[0]) && parseInt(x[1]) !== parseInt(y[1])) {
    continue;
  }

  sampleData[i][0] = {
    x1: parseInt(x[0]),
    y1: parseInt(x[1]),
  };
  sampleData[i][1] = {
    x2: parseInt(y[0]),
    y2: parseInt(y[1]),
  };
}

const validInput = sampleData.filter((item) => item.length > 0);

for (let i = 0; i < validInput.length; i++) {
  const line = validInput[i];
  const [x1, x2, y1, y2] = [line[0].x1, line[1].x2, line[0].y1, line[1].y2];

  if (x1 === x2) {
    const base = y1 > y2 ? y2 : y1;
    for (let j = 0; j <= Math.abs(y2 - y1); j++) {
      resArray[x1][j + base]++;
    }
  } else if (y1 === y2) {
    const base = x1 > x2 ? x2 : x1;
    for (let j = 0; j <= Math.abs(x2 - x1); j++) {
      resArray[j + base][y1]++;
    }
  }
}

console.log(resArray.flat().filter((val) => val >= 2).length);
