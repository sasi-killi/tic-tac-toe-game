interface Props {
  letter: string;
}

function Square({ letter }: Props) {
  return <h1>{letter}</h1>;
}

export default Square;
