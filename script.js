// Gameboard
// 0,1,2
// 3,4,5
// 6,7,8

const gameboard = (() => { // arrow function avoids the standard function and having to have a function name.

    let board = ['', '', '', '', '', '', '', '', '']

    // allows to retrieve board arr
    const getBoard = () => {
        return board
    }

    // accepts player token into board
    function playerInput(value, index) {
        board[index] = value
        console.log(board)
    }

    return { getBoard, playerInput }
})(); // () at the end here makes it a IIFE where you can call on it later via gameboard.playerInput().
// otherwise if it was just a function before i would need to do const { getBoard , playerInput } = gameboard() in any other function to access it

const playerController = (() => {
    const player1 = 1;
    const player2 = 2;

    return { player1, player2 }
})()

const rounds = (() => {
    let round = 0;

    const checkRound = () => { 
        return round 
    }

    const nextRound = () => {
        round++
        console.log(round)
    }

    return { checkRound, nextRound }
})()

const playTurn = ((index) => {
    const { checkRound } = roundController()
    const { player1, player2 } = playerController()
    const round = checkRound()
    console.log(round)

    const playerSign = round % 2 === 0 ? player1 : player2
    if (round > 3) {
        console.log("check winner")
        checkWinner(Number(index), playerSign, board)
    }
    return playerSign
})();

function checkInput(userInput) {
    const { player1, player2 } = playerController // otherwise it would ahve been const { player1, player2 } = playerController(). makes the variables accessible? global but private?
    
    let board = gameboard.getBoard()

    const playerSign = rounds.checkRound() % 2 === 0 ? player1 : player2

    if (board[userInput] === '') {
        gameboard.playerInput(playerSign, userInput)
        rounds.nextRound()
    } else { 
        console.log("space filled")
    }

}

const displayBoard = (() => {
    const container = document.getElementById('container')
    const playArea = document.createElement('div')
    playArea.classList.add('game')
    for (i = 0; i < 9; i++) {
        const div = document.createElement('div')
        div.classList.add('cell')
        div.id = i
        div.addEventListener('click', e => checkInput(div.id))
        playArea.appendChild(div)
    }
    container.appendChild(playArea)

    return { displayBoard }
})();

const checkWinner = ((fieldIndex, playerSign, board) {
    console.log(fieldIndex, playerSign)
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
    let combinations = winConditions.filter(combination => combination.includes(fieldIndex))
    console.log(combinations[0], combinations.length)
    console.log(board[0],board[1], board[2])
    let possibleCombinations = combinations.some(possibleCombo => possibleCombo.every(index => board[index] === playerSign))
    console.log(possibleCombinations)
    // console.log(winConditions.filter((combination) => combination.includes(fieldIndex)).some((possibleCombination) => possibleCombination.every((index) => board[index] === playerSign)));
    // console.log(winConditions.filter(combination => combination.includes(fieldIndex))).some(possibleCombo => possibleCombo.every(index => board[index] === playerSign))
    // console.log(winConditions.filter(combination => combination.includes(fieldIndex)).some(possibleCombo => possibleCombo.every(index => board[index] === playerSign)))
    // return 
})();

function gameController() {
    
    displayBoard(checkInput)

    return
}

gameController()