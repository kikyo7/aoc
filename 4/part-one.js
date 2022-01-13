const { input } = require("./input");

let boards = [];
let randomNumList = input[0].split(",");

input.forEach((val, i) => {
  let board = [];
  if (i > 0) {
    const itemArr = val.split("\n");
    itemArr.forEach((line, lineIdx) => {
      board[lineIdx] = [];
      const lineNums = line.split(" ").filter((v) => v.length > 0);
      lineNums.forEach((item, itemIndex) => {
        board[lineIdx][itemIndex] = {
          value: item,
          marked: false,
        };
      });
    });
    boards.push(board);
  }
});

let unmarkedSum = 0;
let lastNum = 0;

getUnmarkedSum();

const res = unmarkedSum * lastNum;
console.log(res);

function getUnmarkedSum() {
  for (const choosenNum of randomNumList) {
    const cBoard = boards[b];
    unmarkedSum = 0;

    cBoard.forEach((line) => {
      line.forEach((item) => {
        if (choosenNum === item.value) {
          item.marked = true;
          lastNum = choosenNum;
        }
      });
    });
    if (isWinner(cBoard)) {
      for (let i = 0; i < cBoard.length; i++) {
        const row = cBoard[i];
        for (let j = 0; j < row.length; j++) {
          if (row[j].marked === false) {
            unmarkedSum += parseInt(row[j].value);
          }
        }
      }
      return;
    }
  }
}

function isWinner(board) {
  let isWinner = false;
  for (const row of board) {
    for (let j = 0; j < row.length; j++) {
      if (!row[j].marked) {
        break;
      }
      if (j === row.length - 1) {
        isWinner = true;
        break;
      }
    }
    if (isWinner) return isWinner;
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      const item = board[j][i];

      if (!item.marked) break;
      if (j === board.length - 1) {
        isWinner = true;
        break;
      }
    }
    if (isWinner) return isWinner;
  }
}
