const gameBoard = (() => {
  const map = new Array(9);

  return {map};
})();

const Player = marker => {

  return {marker}
};

const displayController = (() => {
  const showMap = () => {
    const squareList = document.querySelectorAll('.square');
    for (let i=0; i<gameBoard.map.length; i++) {
      if (gameBoard.map[i] != undefined) {
        squareList[i].textContent = gameBoard.map[i];
      }
    }
  }

  const winningMove = () => {
    const map = gameBoard.map;
    if ((map[0] != undefined && (map[0] == map[1] && map[1] == map[2]))
      || (map[4] != undefined && (map[3] == map[4] && map[4] == map[5]))
      || (map[8] != undefined && (map[6] == map[7] && map[7] == map[8]))
      || (map[0] != undefined && (map[0] == map[3] && map[3] == map[6]))
      || (map[4] != undefined && (map[1] == map[4] && map[4] == map[7]))
      || (map[8] != undefined && (map[0] == map[4] && map[4] == map[8]))
      || (map[0] != undefined && (map[0] == map[4] && map[4] == map[8]))
      || (map[4] != undefined && (map[2] == map[4] && map[4] == map [6]))) {
      return true;
    }
  }

  const playTurn = () => {
    const display = document.querySelector('.display');
    let moveCounter = 0;
    let move = 1;
    const squareList = document.querySelectorAll('.square');
    for (let i=0; i<gameBoard.map.length; i++) {
      squareList[i].addEventListener('click', function() {
        let index = squareList[i].getAttribute('data-id');
        if (move == 1 && gameBoard.map[index] == undefined && winningMove() != true) {
          gameBoard.map[index] = 'X';
          moveCounter += 1;
          displayController.showMap();
          if (winningMove() == true) {
            display.textContent = 'Player 1 Wins';
          } else if (moveCounter == 9) {
            display.textContent = "It's a Draw";
          }
          move = 2;
        } else if (move == 2 && gameBoard.map[index] == undefined && winningMove() != true) {
          gameBoard.map[index] = 'O';
          moveCounter += 1;
          displayController.showMap();
          if (winningMove() == true) {
            display.textContent = 'Player 2 Wins';
          } else if (moveCounter == 9) {
            display.textContent = "It's a Draw";
          }
          move = 1;
        }
      });
    }
  }
  return {showMap, playTurn, winningMove};
})();

displayController.playTurn();
