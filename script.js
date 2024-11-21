// Make Gameboard
// 0,1,2
// 3,4,5
// 6,7,8

// function getValue() {}

function gameboard() {
    let board = ['', '', '', '', '', '', '', '', '']

    // gets board for UI to render
    function getBoard() {
        return board
    }

    // another function to update board with player value
    function playerInput(value) {
        board[0] = value
    };

    return { getBoard, playerInput }
}

function gameController() {
    let boardState = gameboard() // brings in functions and let board
    boardState.getBoard()
    boardState.playerInput(1) // working 
    console.log(boardState.getBoard())
    boardState.getBoard()
    
    const player1 = 1;
    const player2 = 2;
    let round = 1;
    
    function playTurn(index) { 
        boardState.playerInput(1)
        round++
    }

}

function checkWinner(fieldIndex) {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winConditions
      .filter((combination) => combination.includes(fieldIndex))
      .some((possibleCombination) =>
        possibleCombination.every(
          (index) => gameBoard.getField(index) === getCurrentPlayerSign()
        )
      );
  };



let gamepieces = { gameboard }
console.log(gameController())


// // display function

// const container = document.getElementById('container')
// const playArea = document.createElement('div')
// playArea.classList.add('game')
// console.log(board)
// for (i = 0; i < 9; i++) {
//     const div = document.createElement('div')
//     div.classList.add('cell')
//     div.id = i
//     // console.log(board)
//     // div.innerHTML = `<p>${board[i]}<p>`
//     div.addEventListener('click', e => playerInput(div, players))
//     playArea.appendChild(div)
// }
// container.appendChild(playArea)