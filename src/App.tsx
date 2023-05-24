import Game from "./components/Game";
import "./App.css";
import { Button, useColorMode } from "@chakra-ui/react";
import { useEffect } from "react";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    colorMode === "light" && toggleColorMode();
  }, []);

  return (
    <div>
      <Game />
    </div>
  );
}

export default App;
