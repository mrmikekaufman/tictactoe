let display = document.querySelectorAll(".square");
let footer = document.querySelector(".footer");
let count = 0;

const Player = (letter, name) => {
  let moves = [];
  return {
    letter,
    name,
    moves,
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

const checkWinner = (playerOne, playerTwo, controller) => {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
  ];
  for (combo in winningCombos) {
    let allFoundedOne = winningCombos[combo].every((ai) =>
      playerOne.moves.includes(ai)
    );
    let allFoundedTwo = winningCombos[combo].every((ai) =>
      playerTwo.moves.includes(ai)
    );
    if (allFoundedOne === true || allFoundedTwo === true) {
      const reset = document.createElement("button");
      reset.textContent = "RESET";
      reset.classList.toggle("reset");
      reset.addEventListener("click", () => {
        for (square in Gameboard.gameboard) {
          Gameboard.gameboard[square] = "";
        }
        playerOne.moves = [];
        playerTwo.moves = [];
        playerOne.name = "";
        playerTwo.name = "";
        count = 0;
        displayController.displayController();
        Gameboard.Game();
      });
      if (allFoundedOne === true) {
        footer.textContent =
          "Congrats! " + playerOne.name + " you won the game!";
        controller.abort();
      }
      if (allFoundedTwo === true) {
        footer.textContent =
          "Congrats! " + playerTwo.name + " you won the game!";
        controller.abort();
      }
      footer.appendChild(reset);
      return true;
    }
  }
};

const Gameboard = (() => {
  let gameboard = ["", "", "", "", "", "", "", "", ""];
  const Game = () => {
    const controller = new AbortController();
    const { signal } = controller;
    let nameOne = prompt("What is the name of player 1?");
    let nameTwo = prompt("What is the name of player 2?");
    const playerOne = Player("X", nameOne);
    const playerTwo = Player("O", nameTwo);
    footer.textContent = playerOne.name + "'s turn!";
    display.forEach((square) => {
      square.addEventListener(
        "click",
        () => {
          if (count % 2 === 0 && gameboard[square.id] === "") {
            count += 1;
            gameboard[square.id] = playerOne.letter;
            playerOne.moves.push(parseInt(square.id));
            footer.textContent = playerTwo.name + "'s turn!";
          } else if (count % 2 !== 0 && gameboard[square.id] === "") {
            count += 1;
            gameboard[square.id] = playerTwo.letter;
            playerTwo.moves.push(parseInt(square.id));
            footer.textContent = playerOne.name + "'s turn!";
          }
          displayController.displayController();
          checkWinner(playerOne, playerTwo, controller);
          if (
            count === 9 &&
            checkWinner(playerOne, playerTwo, controller) !== true
          ) {
            footer.textContent = "Game Over! It's a tie.";
            const reset = document.createElement("button");
            reset.textContent = "RESET";
            reset.classList.toggle("reset");
            reset.addEventListener("click", () => {
              for (square in gameboard) {
                gameboard[square] = "";
              }
              playerOne.moves = [];
              playerTwo.moves = [];
              playerOne.name = "";
              playerTwo.name = "";
              count = 0;
              displayController.displayController();
              Game();
            });
            footer.appendChild(reset);
            controller.abort();
          }
        },
        { signal },
        { once: true }
      );
    });
  };
  return {
    Game,
    gameboard,
  };
})();

Gameboard.Game();
