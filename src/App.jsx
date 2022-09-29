import { GameBoard } from "./components";
import "./App.css";

const SIZE = 6

function App() {
  return (
    <GameBoard count={SIZE} />
  )
}

export default App;
