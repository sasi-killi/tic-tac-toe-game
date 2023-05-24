import Game from "./components/Game";
import "./App.css";
import { Center, useColorMode } from "@chakra-ui/react";
import { useEffect } from "react";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    colorMode === "light" && toggleColorMode();
  }, []);

  return (
    <div>
      <Center height={"100vh"}>
        <Game />
      </Center>
    </div>
  );
}

export default App;
