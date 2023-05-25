import { Center } from "@chakra-ui/react";

interface Props {
  winner: string;
  isXNext: boolean;
  isGameOver: boolean;
}

function TurnDecider({ winner, isXNext, isGameOver }: Props) {
  if (isGameOver)
    return (
      <Center marginBottom={8} fontSize={"1.5em"}>
        <h1>Game Over</h1>
      </Center>
    );

  return (
    <Center marginBottom={8} fontSize={"1.5em"}>
      {winner ? (
        <h1>winner: {winner}</h1>
      ) : (
        <h1>Next Player: {isXNext ? "X" : "O"}</h1>
      )}
    </Center>
  );
}

export default TurnDecider;
