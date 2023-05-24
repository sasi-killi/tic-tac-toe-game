interface Props {
  children: string;
}

function Square({ children }: Props) {
  return <p>{children}</p>;
}

export default Square;
