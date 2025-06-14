const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

let currentPlayer = "X";
let cells = Array(9).fill("");
let gameActive = true;

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns
  [0,4,8], [2,4,6]           // diagonals
];

// Create cells
for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.dataset.index = i;
  board.appendChild(cell);
}

function handleClick(e) {
  const cell = e.target;
  const index = cell.dataset.index;

  if (cells[index] !== "" || !gameActive) return;

  cells[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (!cells.includes("")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return (
      cells[a] === currentPlayer &&
      cells[a] === cells[b] &&
      cells[a] === cells[c]
    );
  });
}

function resetGame() {
  cells = Array(9).fill("");
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;

  document.querySelectorAll(".cell").forEach(cell => {
    cell.textContent = "";
  });
}

// Attach listeners
document.querySelectorAll(".cell").forEach(cell =>
  cell.addEventListener("click", handleClick)
);

resetBtn.addEventListener("click", resetGame);
