// gameboardController
// 0,1,2
// 3,4,5
// 6,7,8

const gameboardController = (() => { // arrow function avoids the standard function and having to have a function name.
    let board = ['', '', '', '', '', '', '', '', '']
    const getBoard = () => board    // allows to retrieve board arr
    const playerInput = (value, index) => board[index] = value;  // accepts player token into board. console.log here immedieatly retruns empty arr due to IIFE

    return { getBoard, playerInput }
})(); // () at the end here makes it a IIFE where you can call on it later via gameboardController.playerInput().
// otherwise if it was just a function before i would need to do const { getBoard , playerInput } = gameboardController() in any other function to access it

const playerController = (() => {
    const player1 = 1;
    const player2 = 2;

    return { player1, player2 }
})()

const roundController = (() => {
    let round = 0;
    const getRound = () => round
    const nextRound = () => round++

    return { getRound, nextRound }
})()

function checkInput(userInput) {
    const { player1, player2 } = playerController // otherwise it would ahve been const { player1, player2 } = playerController(). makes the variables accessible? global but private?
    let board = gameboardController.getBoard()
    const playerSign = roundController.getRound() % 2 === 0 ? player1 : player2

    if (board[userInput] === '') {
        gameboardController.playerInput(playerSign, userInput)
        roundController.nextRound()
        console.log("received")
    } else { 
        console.log("space filled")
    }

    if (roundController.getRound() > 8) {
        console.log("tie")
    } else if (roundController.getRound() > 4) {
        checkWinner(Number(userInput), playerSign, board)
    }
    
}

function displayBoard() {
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
};

function checkWinner(fieldIndex, playerSign) { // does not need to be an IIFE as it's just a standard function and has no private vars
    console.log(gameboardController.getBoard())
    let board = gameboardController.getBoard()
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
    let possibleCombinations = combinations.some(possibleCombo => possibleCombo.every(index => board[index] === playerSign))
    console.log(possibleCombinations)
    return possibleCombinations ? console.log("winner") : console.log("keep playing")
};

// runs game
function gameController() {
    displayBoard(checkInput)

    return
}

gameController()