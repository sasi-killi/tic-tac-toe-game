function getWinArrays(boxSize: number) {
  const arr = [];
  let count = 0;
  const returNum = (boxSize: number, step: number, count: number = 0) => {
    const arr = [];
    for (let i = 0; i < boxSize - 1; i++) {
      boxSize !== 0 ? arr.push((count += step)) : arr.push((count += step));
    }
    return arr;
  };
  for (let i = 0; i < boxSize; i++) {
    arr.push([count, ...returNum(boxSize, 1, count)]);
    count += boxSize;
  }
  count = 0;
  for (let i = 0; i < boxSize; i++) {
    arr.push([count, ...returNum(boxSize, boxSize, count)]);
    count++;
  }
  count = 0;
  for (let i = 0; i < 1; i++) {
    arr.push([count, ...returNum(boxSize, boxSize + 1)]);
  }
  count = boxSize - 1;
  for (let i = 0; i < 1; i++) {
    arr.push([count, ...returNum(boxSize, boxSize - 1, count)]);
  }
  return arr;
}

function calculateWinner(
  lines: number[][],
  index: number,
  letterArray: string[],
  isXNext: boolean
) {
  let isWinner;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(index)) {
      isWinner = lines[i].every((value) => {
        return value === index
          ? true
          : letterArray[value] === (isXNext ? "X" : "O");
      });
    }
    if (isWinner) return isWinner;
  }
  return isWinner;
}

function getInitialLetterState(boxSize: number) {
  return Array.from({ length: boxSize ** 2 }, (_) => "");
}

export { getWinArrays, calculateWinner, getInitialLetterState };
