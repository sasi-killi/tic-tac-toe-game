function getWinArrays(boxSize: number) {
  const arr: number[][] = [];

  const returNum = (boxSize: number, step: number, count: number = 0) => {
    const subArr: number[] = [];
    for (let i = 0; i < boxSize - 1; i++) {
      subArr.push((count += step));
    }
    return subArr;
  };

  let count = 0;

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

  arr.push([count, ...returNum(boxSize, boxSize + 1)]);

  count = boxSize - 1;

  arr.push([count, ...returNum(boxSize, boxSize - 1, count)]);

  return arr;
}

function calculateWinner(
  lines: number[][],
  index: number,
  letterArray: string[],
  isXNext: boolean
) {
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(index)) {
      const isWinner = lines[i].every((value) =>
        value === index ? true : letterArray[value] === (isXNext ? "X" : "O")
      );
      if (isWinner) {
        return isWinner;
      }
    }
  }
  return false;
}

function getInitialLetterState(boxSize: number) {
  return Array.from({ length: boxSize ** 2 }, (_) => "");
}

export { getWinArrays, calculateWinner, getInitialLetterState };
