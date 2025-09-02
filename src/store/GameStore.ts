import { create } from "zustand";
import { combine } from "zustand/middleware";

export type SquareValue = "X" | "O" | null;

export type XIsNext = boolean;

// type GameState = {
//   squares: SquareValue[];
//   setSquares: (
//     nextSquares:
//       | SquareValue[] // imposti direttamente un array
//       | ((prev: SquareValue[]) => SquareValue[]) // oppure una funzione updater
//   ) => void;
// };

export const useGameStore = create(
  combine(
    { squares: Array<SquareValue>(9).fill(null), xIsNext: true },
    (set) => {
      return {
        setSquares: (
          nextSquares: SquareValue[] | ((prev: SquareValue[]) => SquareValue[])
        ) => {
          set((state) => ({
            squares:
              typeof nextSquares === "function"
                ? nextSquares(state.squares)
                : nextSquares,
          }));
        },
        setXIsNext: (nextXIsNext: XIsNext | ((prev: XIsNext) => XIsNext)) => {
          set((state) => ({
            xIsNext:
              typeof nextXIsNext === "function"
                ? nextXIsNext(state.xIsNext)
                : nextXIsNext,
          }));
        },
      };
    }
  )
);
