const { input } = require('./input')

function findShortestPath(input){
    const height = input.length;
    const width = input[0].length;
    const risks = JSON.parse(JSON.stringify(input))

    const riskCosts = risks.map((r) => r.map((_) => Infinity));
    riskCosts[0][0] = 0;

    const q = [[[0, 0], 0]];
    while (q.length > 0) {
        const [[x1, y1], riskCost] = q.pop();

        const neighbors = [
            [x1 + 1, y1],
            [x1 - 1, y1],
            [x1, y1 + 1],
            [x1, y1 - 1]
        ].filter(([x1, y1]) => x1 >= 0 && x1 < height && y1 >= 0 && y1 < width);

        neighbors.forEach(([x2, y2]) => {
            const cost = riskCost + input[x2][y2];
            if (cost < riskCosts[x2][y2]) {
                riskCosts[x2][y2] = cost;
                q.push([[x2, y2], cost]);
                // 按照坐标点从大到小排列
                q.sort((a, b) => b[1] - a[1]);
            }
        });
    }
    return riskCosts[height - 1][width - 1];
};




function expand(input){
  let expandedArr = []
  let firstBlock = []
  // 先横向膨胀
  for(let row of input){
    let currentRow = [...row]
    let next = [...row]
    for(let i=0; i<4; i++){
      next = next.map((c) => (c + 1 > 9 ? 1 : c + 1));
      currentRow = [...currentRow, ...next]
    }
    expandedArr.push(currentRow)
    firstBlock.push(currentRow)
  }

  // 再纵向膨胀
  for(let row of firstBlock){
    let nextRow = [...row]
    for(let i=0; i<4; i++){
      nextRow = nextRow.map((c) => (c + 1 > 9 ? 1 : c + 1));
      expandedArr.push(nextRow)
    }
  }

  return expandedArr  
}



console.log(findShortestPath(expand(input)))




