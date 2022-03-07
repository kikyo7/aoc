const { input } = require("./input")

const caves = {}

const isBig = (cave) => {
  return cave.match(/^[A-Z]+$/)
}

const addPath = (from, to) => {
  if(!caves[from]){
    caves[from] = [] 
  }
  caves[from].push(to)
}

const getPath = (from, visited, twice) => {
  if(from == 'end') return 1

  if(visited[from]){
    if(twice || from == 'start') return 0
    twice = true
  }

  if(!isBig(from)) visited[from] = true

  let paths = 0
  for(const cave of caves[from]){
    paths += getPath(cave, {...visited}, twice)
  }
  return paths
}

const solution1 = (input) => {
  input.forEach(([from, to])=> {
    addPath(from, to)
    addPath(to, from)
  })

  const paths = getPath('start', {}, true)
  return paths
}

const solution2 = (input) => {
   input.forEach(([from, to]) => {
     addPath(from, to);
     addPath(to, from);
   });

   const paths = getPath("start", {}, false);
   return paths;
}

// console.log(solution1(input))
console.log(solution2(input))