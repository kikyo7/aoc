const { input } = require("./input");

let sampleData = [];

function genSampleData(hasDiagonalLine) {
  for (let i = 0; i < input.length; i++) {
    const val = input[i];
    const x = val[0].split(",");
    const y = val[1].split(",");
    const [x1, x2, y1, y2] = [
      parseInt(x[0]),
      parseInt(y[0]),
      parseInt(x[1]),
      parseInt(y[1]),
    ];
    sampleData[i] = [];

    if (hasDiagonalLine) {
      if (x1 !== x2 && y1 !== y2) {
        if (
          !(x1 === y1 && x2 === y2) &&
          Math.abs(x1 - x2) !== Math.abs(y2 - y1)
        )
          continue;
      }
    } else {
      if (x1 !== x2 && y1 !== y2) {
        continue;
      }
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
}

function calculateRes(hasDiagonalLine) {
  genSampleData(hasDiagonalLine);

  const validInput = sampleData.filter((item) => item.length > 0);
  let resArray = new Array(1000).fill(0).map(() => new Array(1000).fill(0));

  for (const line of validInput) {
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
    } else {
      if (hasDiagonalLine) {
        const delta = Math.abs(x2 - x1);
        for (let i = 0; i <= delta; i++) {
          let _x = x1 < x2 ? x1 + i : x1 - i;
          let _y = y1 < y2 ? y1 + i : y1 - i;
          resArray[_x][_y]++;
        }
      }
    }
  }

  return resArray.flat().filter((val) => val >= 2).length;
}

const partOne = () => console.log(calculateRes());
const partTwo = () => console.log(calculateRes(true));

partTwo();
