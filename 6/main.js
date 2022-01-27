const { input } = require("./input");

const getNewFishPopulation = (fish) => {
  let newFishCount = 0;
  const newFishPopulation = fish.map((f) => {
    if (f === 0) {
      newFishCount++;
      return 6;
    }
    return f - 1;
  });
  newFishPopulation.push(...Array(newFishCount).fill(8));
  return newFishPopulation;
};

const solve_one = (data) => {
  let fish = data;
  for (let day = 1; day <= 80; day++) {
    fish = getNewFishPopulation(fish);
  }
  return fish.length;
};


const sumFish = (occurenceArray) => {
  return occurenceArray.reduce((sum, fishCount) => sum + fishCount, 0);
};

const solve_two = (data) => {
  const fishOccurence = Array(9).fill(0);

  data.forEach((i) => fishOccurence[i]++);

  for (let day = 1; day <= 256; day++) {
    const newFishCount = fishOccurence.shift();
    fishOccurence[6] += newFishCount;
    fishOccurence.push(newFishCount);
  }
  return sumFish(fishOccurence);
}


console.log(solve_two(input));
