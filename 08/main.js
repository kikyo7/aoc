const { input } = require("./input");

const solution1 = (input) => {
  let res = 0
  input.forEach(([_, outs]) => {
    outs.forEach(out => {
      const len = out.length
      if(len === 2 || len === 3 || len === 4 || len === 7){
        res++
      }
    })
  })

  return res
}

const solution2 =(input) => {
  let sum = 0
  for(const [patterns, outputs] of input){
    const segments = {}
    const occurence = getCodeOccurences(patterns)
    for(const [code, occ] of Object.entries(occurence)){
      switch(occ){
        case 4:
          segments["e"] = code
          break;
        case 6:
          segments["b"] = code
          break;
        case 9:
          segments["f"] = code
          break;
        default:
          break;
      }
    }
    const one = patterns.find(p => p.length === 2)
    const four = patterns.find(p => p.length === 4)
    const seven = patterns.find(p => p.length === 3)
    const eight = patterns.find(p => p.length === 7)

    segments["a"] = seven.split("").find(code => !one.includes(code))
    segments["c"] = one.split("").find(code => code !== segments["f"])
    segments["d"] = four.split("").find(code => !one.includes(code) && code !== segments["b"])
    segments["g"] = eight.split("").find(code => !Object.values(segments).includes(code))
    sum += getOutput(outputs, segments)
  }

  return sum
}

const getCodeOccurences = (patterns) => {
  const allCode = patterns.join("")
  const occurence = {}

  for(const code of ["a", "b", "c","d", "e", "f", "g"]){
    occurence[code] = allCode.match(new RegExp(code, "g")).length
  }

  return occurence
}

const getOutput = (output, segments) => {
  const correctCode = {}
  Object.entries(segments).forEach(([correct, incorrect]) => correctCode[incorrect] = correct)

  const outputRes = output.map(pattern => getNumberFromPattern(getRealPattern(pattern, correctCode))).join("")
  return Number(outputRes)
}

const getNumberFromPattern = (pattern) => {
  switch (pattern) {
    case "abcefg":
      return "0";
    case "cf":
      return "1";
    case "acdeg":
      return "2";
    case "acdfg":
      return "3";
    case "bcdf":
      return "4";
    case "abdfg":
      return "5";
    case "abdefg":
      return "6";
    case "acf":
      return "7";
    case "abcdefg":
      return "8";
    case "abcdfg":
      return "9";
    default:
      return "";
  }
}

const getRealPattern = (pattern, correctCode) => {
  return pattern.split("").map(code => correctCode[code]).sort().join("")
}

console.log(solution2(input))