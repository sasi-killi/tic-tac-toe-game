import { useState, useMemo, useEffect } from "react";
import {
  calculateWinner,
  getInitialLetterState,
  getWinArrays,
} from "../helpers/gameHelpers";
import Board from "./Board";
import { Box, Button, Center } from "@chakra-ui/react";
import TurnDecider from "./TurnDecider";
import BoardSize from "./BoardSize";

function Game() {
  const [boxSize, setBoxSize] = useState(0);
  const [isXNext, setXNext] = useState(true);
  const [squareData, setSquareData] = useState(getInitialLetterState(boxSize));
  const [winner, setWinner] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    setSquareData(getInitialLetterState(boxSize));
  }, [boxSize]);

  const winLines = useMemo(() => getWinArrays(boxSize), [boxSize]);

  const handleClick = (index: number) => {
    if (squareData[index] || winner) return;

    const arr = [...squareData];
    arr[index] = isXNext ? "X" : "O";

    isXNext ? setXNext(false) : setXNext(true);
    setSquareData(arr);

    const isWinner = calculateWinner(winLines, index, squareData, isXNext);

    if (isWinner) setWinner(isXNext ? "X" : "O");

    setCount(count + 1);
  };

  const isGameOver = count === boxSize ** 2;

  const handleReset = () => {
    setXNext(true);
    setSquareData(getInitialLetterState(boxSize));
    setCount(0);
  };

  if (!boxSize) {
    return (
      <Center height={"100vh"} width={"fit-content"}>
        <BoardSize setBoxSize={setBoxSize} />
      </Center>
    );
  }

  return (
    <Center height={"100vh"} width={"fit-content"}>
      <Box>
        <TurnDecider
          winner={winner}
          isXNext={isXNext}
          isGameOver={isGameOver}
        />
        <Center width="100%">
          <Board
            boxSize={boxSize}
            handleClick={handleClick}
            squareData={squareData}
          />
        </Center>
        {isGameOver && (
          <Center>
            <Button colorScheme="blue" marginTop={8} onClick={handleReset}>
              Reset
            </Button>
          </Center>
        )}
      </Box>
    </Center>
  );
}

export default Game;
