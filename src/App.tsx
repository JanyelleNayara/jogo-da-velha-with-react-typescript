import { useState } from "react";
import "./App.css";

type Players = "O" | "X";

export default function App() {
  const [turn, setTurn] = useState<Players>("O");
  const [winner, setWinner] = useState<Players | null>(null);
  const [draw, setDraw] = useState<boolean | null>(null);
  const [marks, setMarks] = useState<{ [key: string]: Players }>({});

  const getSquares = () => {
    return new Array(9).fill(true);
  };

  const play = (index: number) => {
    setMarks((prev) => ({ ...prev, [index]: turn }));
    setTurn((prev) => (prev === "O" ? "X" : "O"));
  };

  return (
    <div className="game">

      <div className="board">
        {getSquares().map((_, index) => (
          <div className="boardSquare" onClick={() => play(index)}>
            {marks[index]}
          </div>
        ))}
      </div>
    </div>
  );
}


