import { Grid, GridItem, Center } from "@chakra-ui/react";
import Square from "./Square";
import { useState, useMemo } from "react";
import {
  getWinArrays,
  calculateWinner,
  getInitialLetterState,
} from "../helpers/gameHelpers";

interface Props {
  boxSize: number;
}

function Board({ boxSize }: Props) {
  const [isXNext, setXNext] = useState(true);
  const [letterArray, setLetterArray] = useState(
    getInitialLetterState(boxSize)
  );
  const [winner, setWinner] = useState("");

  const winLines = useMemo(() => getWinArrays(boxSize), [boxSize]);

  const handleClick = (index: number) => {
    if (letterArray[index] || winner) return;

    const arr = [...letterArray];
    arr[index] = isXNext ? "X" : "O";

    isXNext ? setXNext(false) : setXNext(true);
    setLetterArray(arr);

    const isWinner = calculateWinner(winLines, index, letterArray, isXNext);

    if (isWinner) setWinner(isXNext ? "X" : "O");
  };

  return (
    <Center height={"100vh"}>
      <div>
        <Center marginBottom={8} fontSize={"1.5em"}>
          {winner ? (
            <h1>winner: {winner}</h1>
          ) : (
            <h1>Next Player: {isXNext ? "X" : "O"}</h1>
          )}
        </Center>

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
      </div>
    </Center>
  );
}

export default Board;
