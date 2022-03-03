const { input } = require('./input.js')

const pairs = [
  ["(", ")"],
  ["[", "]"],
  ["{", "}"],
  ["<", ">"],
];

const solution1 = (input) => {
  let res = 0

  input.map(line => {
    const matchRes = match(line)
    if(typeof matchRes === 'number'){
      res += matchRes
    }
  })
  return res
}

const solution2 = (input) => {
  const stack = []
  input.forEach(line => {
    const score = incomplete(line)
    if(score > 0){
      stack.push(score);
    }
  })
  const sorted = stack.sort((a, b) => a - b);
  return sorted[(sorted.length - 1) / 2];
}

const match = (line) => {
  let stack = [];
  for (const c of line) {
    if (c === ")") {
      if (stack.pop() === "(") continue;
      else return 3;
    }
    if (c === "]") {
      if (stack.pop() === "[") continue;
      else return 57;
    }
    if (c === "}") {
      if (stack.pop() === "{") continue;
      else return 1197;
    }
    if (c === ">") {
      if (stack.pop() === "<") continue;
      else return 25137;
    }
    stack.push(c);
  }
  return stack;
}

const incomplete = (line) => {
  const matchRes = match(line)
  if(typeof matchRes === 'number') return 0

  const stack = matchRes
  let r = 0
  while (stack.length > 0) {
    r *= 5;
    const c = stack.pop();
    if (c === "(") r += 1;
    if (c === "[") r += 2;
    if (c === "{") r += 3;
    if (c === "<") r += 4;
  }
  return r;
}

const getMiddle = (arr) =>
  [...arr].sort((x, y) => x - y)[(arr.length - 1) / 2];

console.log(solution2(input))