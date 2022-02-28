const { input } = require("./input")

const height = input.length
const lineLen = input[0].length

const solution1 = (input) => {
  let res = 0
  for(let i=0; i< height; i++){
    for(let j=0; j<lineLen; j++){
      if(isLower(i, j)){
        res += input[i][j] + 1
      }
    }
  }

  return res
}

const solution2 = (input) => {
  const basin = []
  for(let i=0; i<height; i++){
    for(let j=0; j<lineLen; j++){
      if(isLower(i,j)){
        basin.push(getBasin(i, j))
      }
    }
  }

  const sortBasin = basin.sort((a, b) => b-a)
  const res = sortBasin[0] * sortBasin[1] * sortBasin[2]
  return res
}

const isLower = (x, y) => {
  const curNum = input[x][y]
  if(x > 0 && input[x-1][y] <= curNum) return false
  if(y > 0 && input[x][y-1] <= curNum) return false
  if(y < lineLen -1 && input[x][y+1]<=curNum) return false
  if(x< height -1 && input[x+1][y]<=curNum) return false

  return true
}

const getBasin = (x,y, isChecked = []) => {
  if(x < 0 || x >= height || y < 0 || y >= lineLen) return 0
  if(input[x][y] === 9) return 0

  const key = `${x}${y}`
  if(isChecked.includes(key)) return 0

  let count = 1
  isChecked.push(key)

  count += getBasin(x-1, y, isChecked)
  count += getBasin(x+1, y, isChecked)
  count += getBasin(x, y-1, isChecked)
  count += getBasin(x, y+1 ,isChecked)
  return count
}

console.log(solution2(input))