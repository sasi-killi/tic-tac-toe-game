import { Grid, GridItem, Center } from "@chakra-ui/react";
import Square from "./Square";

interface Props {
  boxSize: number;
  squareData: string[];
  handleClick: (index: number) => void;
}

function Board({ boxSize, squareData, handleClick }: Props) {
  return (
    <Grid
      templateColumns={`repeat(${boxSize}, 1fr)`}
      templateRows={`repeat(${boxSize}, 1fr)`}
      border={"1px"}
    >
      {squareData.map((square, index) => {
        return (
          <Center
            key={index}
            height={20}
            width={20}
            border={"1px"}
            onClick={() => handleClick(index)}
          >
            <GridItem fontSize={"1.5em"}>
              <Square>{square}</Square>
            </GridItem>
          </Center>
        );
      })}
    </Grid>
  );
}

export default Board;
