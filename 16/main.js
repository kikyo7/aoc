const { input } = require('./input')

const packetFinder = (arr) => {
  let packetArray = [];

  if (arr.slice(3, 6).join("") == "100") {
    packetArray = packetArray.concat(arr.slice(0, 6));
    let flag = false;
    while (flag == false) {
      let chunk = arr.slice(packetArray.length, packetArray.length + 5);
      packetArray = packetArray.concat(chunk);
      flag = chunk[0] == "0" ? true : false;
    }
  } else {
    packetArray = packetArray.concat(arr.slice(0, 7));

    if (packetArray[6] == "0") {
      let bitLength = parseInt(arr.slice(7, 22).join(""), 2);
      packetArray = packetArray.concat(arr.slice(7, 22));
      let newArr = arr.slice(22, 22 + bitLength);
      while (newArr.length > 0) {
        let subIter = packetFinder(newArr);
        let subPacket = subIter["packet"];
        packetArray.push(subPacket);
        newArr = subIter["newArray"];
      }

    } else {
      let subNum = parseInt(arr.slice(7, 18).join(""), 2);
      packetArray = packetArray.concat(arr.slice(7, 18));
      let yonArray = arr.slice(packetArray.flat(100).length);
      for (let i = 0; i < subNum; i++) {
        let iteration = packetFinder(yonArray);
        packetArray.push(iteration["packet"]);
        yonArray = iteration["newArray"];
      }
    }
  }
  return {
    packet: packetArray,
    newArray: arr.slice(packetArray.flat(100).length),
  };
};

const packetFindIter = (arr) => {
  let totalPacketArray = [];
  while (arr.length > 0) {
    let iteration = packetFinder(arr);
    arr = iteration["newArray"];
    let newPacketArray = iteration["packet"];
    while (newPacketArray.flat().length % 4 != 0) {
      newPacketArray.push(arr.shift());
    }
    totalPacketArray.push(newPacketArray);
  }
  return totalPacketArray;
};

const inputArray = packetFindIter(input);

const solution1 = (arr) => {
  let result = 0;
  for (item of arr) {
    if (typeof item == "object" && item.length > 0) {
      let a = item.slice(0, 3);
      let count = parseInt(a.join(""), 2);
      let sub = solution1(item);
      result += count + sub;
    }
  }
  return result;
};

console.log(solution1(inputArray))

const solution2 = (arr) => {
  let result = 0;
  if (arr.slice(3, 6).join("") == "100") {
    let resultArray = [];
    for (let i = 6; true; i += 5) {
      resultArray.push(arr.slice(i + 1, i + 5).join(""));
      if (arr[i] == "0") {
        break;
      }
    }
    result = parseInt(resultArray.join(""), 2);
  } else if (arr.slice(3, 6).join("") == "000") {
    arr.forEach((a) => {
      if (typeof a == "object") {
        result += solution2(a);
      }
    });
  } else if (arr.slice(3, 6).join("") == "001") {
    result = 1;
    arr.forEach((a) => {
      if (typeof a == "object") {
        result *= solution2(a);
      }
    });
  } else if (arr.slice(3, 6).join("") == "010") {
    let compareArray = [];
    arr.forEach((a) => {
      if (typeof a == "object") {
        compareArray.push(solution2(a));
      }
    });
    result = compareArray.sort((a, b) => a - b)[0];
  } else if (arr.slice(3, 6).join("") == "011") {
    let compareArray = [];
    arr.forEach((a) => {
      if (typeof a == "object") {
        compareArray.push(solution2(a));
      }
    });
    result = compareArray.sort((a, b) => b - a)[0];
  } else if (arr.slice(3, 6).join("") == "101") {
    let compareArray = [];
    arr.forEach((a) => {
      if (typeof a == "object") {
        compareArray.push(solution2(a));
      }
    });
    result = compareArray[0] > compareArray[1] ? 1 : 0;
  } else if (arr.slice(3, 6).join("") == "110") {
    let compareArray = [];
    arr.forEach((a) => {
      if (typeof a == "object") {
        compareArray.push(solution2(a));
      }
    });
    result = compareArray[0] < compareArray[1] ? 1 : 0;
  } else if (arr.slice(3, 6).join("") == "111") {
    let compareArray = [];
    arr.forEach((a) => {
      if (typeof a == "object") {
        compareArray.push(solution2(a));
      }
    });
    result = compareArray[0] == compareArray[1] ? 1 : 0;
  }
  return result;
};

console.log(solution2(inputArray[0]))
