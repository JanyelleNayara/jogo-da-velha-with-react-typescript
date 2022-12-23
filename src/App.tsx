import { useEffect, useState } from "react";
import "./App.css";

type Players = "O" | "X";

export default function App() {
  const [turn, setTurn] = useState<Players>("O");
  const [winner, setWinner] = useState<Players | null>(null);
  const [draw, setDraw] = useState<boolean | null>(null);
  const [marks, setMarks] = useState<{ [key: string]: Players }>({});
  const gameOver = !!winner || !!draw;

  const getSquares = () => {
    return new Array(9).fill(true);
  };

  const play = (index: number) => {
    if (marks[index] || gameOver) {
      return;
    }
    
    setMarks((prev) => ({ ...prev, [index]: turn }));
    setTurn((prev) => (prev === "O" ? "X" : "O"));
  };

  const getSquarePlayer = (index: number) => {
    if (!marks[index]) {
      return;
    }
    return marks[index]
  }

  const getWinner = () => {
    const victoryLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],

      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],

      [0, 4, 8],
      [2, 4, 6],
    ]
    for (const line of victoryLines) {
      const [a, b, c] = line;

      if (marks[a] && marks[a] === marks[b] && marks[a] === marks[c]) {
        return marks[a]
      }
    }
  };

  const reset = () => {
    setMarks({})
    setWinner(null)
    setDraw(null)
  }

  useEffect(() => {
    const winner = getWinner()

    if (winner) {
      setWinner(winner)
    } else {
      if (Object.keys(marks).length === 9) {
        setDraw(true)
      }
    }
  }, [marks])



  return (
    <div className="game">
      {winner && <h2>O jogador <strong>{winner}</strong> ganhou</h2>}
      {draw && <h2> Empate!</h2>}

      <div className="board">
        {getSquares().map((_, index) => (
          <div className={`boardSquare ${getSquarePlayer(index)}`} onClick={() => play(index)}>
            {marks[index]}
          </div>
        ))}
      </div>
      {!gameOver && <p>É a vez do jogador <strong>{turn}</strong></p>}
      {gameOver && <button onClick={reset}>Jogar novamente</button>}
    </div>
  );
}


