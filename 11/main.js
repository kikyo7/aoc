const { input } = require("./input")
const height = input.length
const width = input[0].length

const getAdjacents = (x, y) => {
  const adjacents = []

  if (x > 0) {
    adjacents.push([x - 1, y])

    if (y > 0) {
      adjacents.push([x - 1, y - 1])
    }

    if (y < height - 1) {
      adjacents.push([x - 1, y + 1])
    }
  }

  if (x < width - 1) {
    adjacents.push([x + 1, y])

    if (y > 0) {
      adjacents.push([x + 1, y - 1])
    }

    if (y < height - 1) {
      adjacents.push([x + 1, y + 1])
    }
  }

  if (y > 0) {
    adjacents.push([x, y - 1])
  }

  if (y < height - 1) {
    adjacents.push([x, y + 1])
  }

  return adjacents
}

const step = () => {
  const flashed = new Set()
  let continueNext = true

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      input[y][x] = input[y][x] + 1
    }
  }

  while (continueNext) {
    continueNext = false

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (input[y][x] > 9) {
          flashed.add(`${x},${y}`)
          input[y][x] = 0

          getAdjacents(x, y).forEach(([x, y]) => {
            if (!flashed.has(`${x},${y}`)) {
              input[y][x]++
            }
          })

          continueNext = true
        }
      }
    }
  }

  return flashed.size
}

const solution1 = () => {
  let flashes = 0
  for (let i = 0; i < 100; i++) {
    flashes += step()
  }

  return flashes
}

const solution2 = () => {
  let num = 0

  while (true) {
    num++
    if (step() === width * height) {
      return num
    }
  }
}

// console.log(solution1())
console.log(solution2())