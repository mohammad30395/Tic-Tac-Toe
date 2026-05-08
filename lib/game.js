export const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

export function getWinner(board) {
  for (const line of winningLines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { symbol: board[a], line };
    }
  }

  if (board.every(Boolean)) return { symbol: "draw", line: [] };
  return null;
}

export function emptyCells(board) {
  return board.map((cell, index) => (cell ? null : index)).filter((index) => index !== null);
}

function findTacticalMove(board, symbol) {
  for (const index of emptyCells(board)) {
    const copy = [...board];
    copy[index] = symbol;
    const winner = getWinner(copy);
    if (winner?.symbol === symbol) return index;
  }

  return null;
}

function chooseRandom(board) {
  const choices = emptyCells(board);
  return choices[Math.floor(Math.random() * choices.length)] ?? null;
}

function scoreBoard(board, computerSymbol, humanSymbol, depth) {
  const winner = getWinner(board);
  if (winner?.symbol === computerSymbol) return 10 - depth;
  if (winner?.symbol === humanSymbol) return depth - 10;
  if (winner?.symbol === "draw") return 0;
  return null;
}

function minimax(board, isComputerTurn, computerSymbol, humanSymbol, depth = 0) {
  const score = scoreBoard(board, computerSymbol, humanSymbol, depth);
  if (score !== null) return { score, index: null };

  let best = {
    score: isComputerTurn ? -Infinity : Infinity,
    index: null
  };

  for (const index of emptyCells(board)) {
    const copy = [...board];
    copy[index] = isComputerTurn ? computerSymbol : humanSymbol;
    const result = minimax(copy, !isComputerTurn, computerSymbol, humanSymbol, depth + 1);

    if (isComputerTurn && result.score > best.score) {
      best = { score: result.score, index };
    }

    if (!isComputerTurn && result.score < best.score) {
      best = { score: result.score, index };
    }
  }

  return best;
}

export function getComputerMove(board, difficulty, computerSymbol = "O", humanSymbol = "X") {
  const choices = emptyCells(board);
  if (choices.length === 0) return null;

  if (difficulty === "easy") {
    return chooseRandom(board);
  }

  if (difficulty === "medium") {
    const win = findTacticalMove(board, computerSymbol);
    if (win !== null) return win;

    const block = findTacticalMove(board, humanSymbol);
    if (block !== null) return block;

    if (!board[4]) return 4;
    return Math.random() < 0.68 ? chooseRandom(board) : minimax(board, true, computerSymbol, humanSymbol).index;
  }

  return minimax(board, true, computerSymbol, humanSymbol).index;
}
