let display = document.querySelectorAll(".square");
let count = 0;
let gameOn = true;

const Gameboard = (() => {
  let gameboard = ["", "", "", "", "", "", "", "", ""];
  return {
    gameboard,
  };
})();

const checkGameBoard = () => {
  if (
    Gameboard.gameboard[0] === "X" &&
    Gameboard.gameboard[1] === "X" &&
    Gameboard.gameboard[2] === "X"
  ) {
    alert("Game Over");
    gameOn = false;
  }
};

const Player = (letter) => {
  return {
    letter,
  };
};

const displayController = (() => {
  const displayController = () => {
    for (let i = 0; i < Gameboard.gameboard.length; i++) {
      display[i].textContent = Gameboard.gameboard[i];
    }
  };
  return {
    displayController,
  };
})();

const Game = () => {
  const playerOne = Player("X");
  const playerTwo = Player("O");
  display.forEach((square) => {
    square.addEventListener(
      "click",
      () => {
        count += 1;
        if (count % 2 === 0) {
          Gameboard.gameboard[square.id] = playerTwo.letter;
        } else {
          Gameboard.gameboard[square.id] = playerOne.letter;
        }
        displayController.displayController();
        console.log(count);
        console.log(playerOne.letter);
        console.log(count % 2 === 0);
      },
      { once: true }
    );
  });
};
