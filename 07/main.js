const { input } = require("./input");

const solution1 = (input) => {
  let min = Number.MAX_VALUE;
  for (let i = 0; i < input.length; i++) {
    let fuel = 0;
    for (let j = 0; j < input.length; j++) {
      fuel += Math.abs(input[i] - input[j]);
    }
    min = Math.min(fuel, min);
  }

  return min;
};

console.log(solution1(input))

const solution2 = (input) => {
  const cal = (num) => {
    return num / 2 * num + num / 2
  }
  let record = Number.MAX_VALUE
  for(let i=0; i<input.length; i++){
    let sum = 0;
    input.forEach(num => {
      sum += cal(Math.abs(num - i))
    })

    if(sum < record) {
      record = sum;
    }
  }

  return record
}

console.log(solution2(input))


