import { GameBoard } from "./components";
import "./App.css";

const BOARD_SIZE = 6

function App() {
  return (
    <GameBoard count={BOARD_SIZE} />
  )
}

export default App;
