export default class Game {
  constructor() {
    this.turn = "O";
    this.board = new Array(9).fill(null);
  }
  //method to change turns
  nextTurn() {
    this.turn = this.turn === "X" ? "O" : "X";
  }

  //method to make moves and check for winning combinations
  makeMove(i) {
    if (!this.gameIsActive()) {
      return;
    }

    if (this.board[i]) {
      return;
    }
    this.board[i] = this.turn;

    if (!this.findWinCombo()) {
      this.nextTurn();
    }
  }

  //method to cycle through possible winning combinations to check for matches on game board
  findWinCombo() {
    const winCombo = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const combo of winCombo) {
      const [a, b, c] = combo;

      if (
        this.board[a] &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      ) {
        return combo;
      }
    }
    return null;
  }
  // checks to see if game is currently active
  gameIsActive() {
    return !this.findWinCombo() && this.board.includes(null);
  }
}
