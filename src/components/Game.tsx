import { useState, useMemo, useEffect } from "react";
import {
  calculateWinner,
  getInitialLetterState,
  getWinArrays,
} from "../helpers/gameHelpers";
import Board from "./Board";
import { Box, Center } from "@chakra-ui/react";
import TurnDecider from "./TurnDecider";
import BoardSize from "./BoardSize";

function Game() {
  const [boxSize, setBoxSize] = useState(0);
  const [isXNext, setXNext] = useState(true);
  const [squareData, setSquareData] = useState(getInitialLetterState(boxSize));
  const [winner, setWinner] = useState("");

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
        <TurnDecider winner={winner} isXNext={isXNext} />
        <Center width="100%">
          <Board
            boxSize={boxSize}
            handleClick={handleClick}
            squareData={squareData}
          />
        </Center>
      </Box>
    </Center>
  );
}

export default Game;
