// Make Gameboard
// 0,1,2
// 3,4,5
// 6,7,8

function gameboard() {
    let board = ['', '', '', '', '', '', '', '', '']

    // gets board for UI to render
    const getBoard = () => {
        return board
    }

    // another function to update board with player value
    function playerInput(value, index, round) {
        if (board[index] != 1 && board[index] != 2) {
            round++
            console.log(round)
            board[index] = value
            console.log(board)
        } else {
            console.log("space full")
            return
        }
    };

    return { getBoard, playerInput }
}

function gameController() {
    const { getBoard, playerInput } = gameboard() // brings in functions and let board

    const player1 = 1;
    const player2 = 2;
    let round = 0; // false = p1's turn
    console.log(round)
    function displayBoard() {
        const container = document.getElementById('container')
        const playArea = document.createElement('div')
        playArea.classList.add('game')
        for (i = 0; i < 9; i++) {
            const div = document.createElement('div')
            div.classList.add('cell')
            div.id = i
            div.addEventListener('click', e => playerInput(playTurn(), div.id, round))
            playArea.appendChild(div)
        }
        container.appendChild(playArea)
    }
    
    function playTurn() {
        if (round > 4) {
            checkWinner()
        }
        return round % 2 === 0 ? player1 : player2
    }

    displayBoard()
}

function checkWinner(fieldIndex) {
    console.log("win is checked")
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


gameController()


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