const { input } = require("./input");

let sampleData = [];
// 初始化一个1000*1000的二维数组
let resArray = new Array(1000).fill(0).map(() => new Array(1000).fill(0));

for (let i = 0; i < input.length; i++) {
  const val = input[i];
  const x = val[0].split(",");
  const y = val[1].split(",");

  const x1 = parseInt(x[0]);
  const x2 = parseInt(y[0]);
  const y1 = parseInt(x[1]);
  const y2 = parseInt(y[1]);
  sampleData[i] = [];
  // check if the line is horizontal or vertical lines
  if (x1 !== x2 && y1 !== y2) {
    if (!(x1 === y1 && x2 === y2) && Math.abs(x1 - x2) !== Math.abs(y2 - y1))
      continue;
  }

  sampleData[i][0] = {
    x1,
    y1,
  };
  sampleData[i][1] = {
    x2,
    y2,
  };
}

const validInput = sampleData.filter((item) => item.length > 0);

for (let i = 0; i < validInput.length; i++) {
  const line = validInput[i];
  const [x1, x2, y1, y2] = [line[0].x1, line[1].x2, line[0].y1, line[1].y2];

  // check vertical line
  // [0,3] -> [0,5]
  if (x1 === x2 && y1 !== y2) {
    const base = y1 > y2 ? y2 : y1;
    for (let j = 0; j <= Math.abs(y2 - y1); j++) {
      resArray[x1][j + base]++;
    }

    // check horizental line
    // [1,0] -> [5,0]
  } else if (y1 === y2 && x1 !== x2) {
    const base = x1 > x2 ? x2 : x1;
    for (let j = 0; j <= Math.abs(x2 - x1); j++) {
      resArray[j + base][y1]++;
    }
  } else {
    const delta = Math.abs(x2 - x1);
    for (let i = 0; i <= delta; i++) {
      let _x = x1 < x2 ? x1 + i : x1 - i;
      let _y = y1 < y2 ? y1 + i : y1 - i;
      resArray[_x][_y]++;
    }
  }
}

console.log(resArray.flat().filter((val) => val >= 2).length);
