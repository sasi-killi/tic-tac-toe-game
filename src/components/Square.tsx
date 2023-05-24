interface Props {
  children: string;
}

function Square({ children }: Props) {
  return <h1>{children}</h1>;
}

export default Square;
