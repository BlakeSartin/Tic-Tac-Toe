export default class GameView {
  constructor(root) {
    this.root = root;
    this.root.innerHTML = `
    <div class="header">
    <input type ="text" id ="player-1-name">
    <input type ="text" id ="player-2-name">
    <div class="header__turn">
    </div>
    <div class="header__status">
    </div>
    <button type="button" class="header__restart">
    <i class="material-icons">restart</i>
    </button>
    </div>
    <div class="board">
    <div class="board__tile" data-index="0">
    </div>
    <div class="board__tile" data-index="1">
    </div>
    <div class="board__tile" data-index="2">
    </div>
    <div class="board__tile" data-index="3">
    </div>
    <div class="board__tile" data-index="4">
    </div>
    <div class="board__tile" data-index="5">
    </div>
    <div class="board__tile" data-index="6">
    </div>
    <div class="board__tile" data-index="7">
    </div>
    <div class="board__tile" data-index="8">
    </div>
    </div>
    `;

    this.onTileClick = undefined;
    this.onRestartClick = undefined;

    this.root.querySelectorAll(".board__tile").forEach((tile) => {
      tile.addEventListener("click", () => {
        this.onTileClick(tile.dataset.index);
      });
    });
    this.root
      .querySelector(".header__restart")
      .addEventListener("click", () => {
        this.onRestartClick();
      });
  }

  update(game) {
    this.updateTurn(game);
    this.updateStatus(game);
    this.updateBoard(game);
  }

  //method to update player turn status
  updateTurn(game) {
    this.root.querySelector(
      ".header__turn"
    ).textContent = `${game.turn}'s turn!`;
  }

  //method to update game status with a winner or a tie
  updateStatus(game) {
    let status = "Active";
    if (game.findWinCombo()) {
      status = `${game.turn} you are the winner!`;
    } else if (!game.gameIsActive()) {
      status = "Tie Game!";
    }
    this.root.querySelector(".header__status").textContent = status;
  }

  //
  updateBoard(game) {
    const winCombo = game.findWinCombo();

    for (let i = 0; i < game.board.length; i++) {
      const tile = this.root.querySelector(`.board__tile[data-index="${i}"]`);

      tile.classList.remove("board__tile--winner");
      tile.textContent = game.board[i];

      if (winCombo && winCombo.includes(i)) {
        tile.classList.add("board__tile--winner");
      }
    }
  }
}
