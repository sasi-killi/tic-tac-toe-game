import { Grid, GridItem, Center } from "@chakra-ui/react";
import Square from "./Square";
import { useState, useMemo } from "react";

interface Props {
  boxSize: number;
}

function Board({ boxSize }: Props) {
  const [isXNext, setXNext] = useState(true);
  const length = boxSize ** 2;
  const array = Array.from({ length }, (_) => "");
  const [letterArray, setLetterArray] = useState(array);
  const [winner, setWinner] = useState("");
  const winLines = useMemo(getWinArrays, [boxSize]);

  console.log("winLines", winLines);

  function getWinArrays() {
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

  function calculateWinner(lines: number[][], index: number) {
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

  const handleClick = (index: number) => {
    if (letterArray[index] || winner) return;
    const arr = [...letterArray];
    arr[index] = isXNext ? "X" : "O";
    isXNext ? setXNext(false) : setXNext(true);
    setLetterArray(arr);
    const isWinner = calculateWinner(winLines, index);
    if (isWinner) setWinner(isXNext ? "X" : "O");
  };

  return (
    <>
      {winner ? (
        <h1>winner: {winner}</h1>
      ) : (
        <h1>Next Player: {isXNext ? "X" : "O"}</h1>
      )}

      <Grid
        templateColumns={`repeat(${boxSize}, 1fr)`}
        templateRows={`repeat(${boxSize}, 1fr)`}
        border={"1px"}
        height={20 * boxSize}
        width={20 * boxSize}
      >
        {letterArray.map((letter, index) => {
          return (
            <Center
              key={index}
              height={20}
              width={20}
              border={"1px"}
              onClick={() => handleClick(index)}
            >
              <GridItem>
                <Square letter={letter} />
              </GridItem>
            </Center>
          );
        })}
      </Grid>
    </>
  );
}

export default Board;
