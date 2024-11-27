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
    const player1 = {name: 'Player 1', value: 1, ready: false};
    const player2 = {name: 'Player 2', value: 2, ready: false};

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
    const playerSign = roundController.getRound() % 2 === 0 ? player1.value : player2.value
    console.log(userInput, playerSign)
    if (board[userInput] === '') {
        displayUserValues(playerSign, userInput)
        gameboardController.playerInput(playerSign, userInput)
        roundController.nextRound()
        console.log("received")
    } else { 
        console.log("space filled")
    }

    if (roundController.getRound() > 8) {
        alertMsg("It's a tie!")
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

function displayUserValues(playerSign, userInput) {
    const targetCell = document.getElementById(`${userInput}`)
    console.log(targetCell)
    if (playerSign === 1) {
        targetCell.classList.add("one")
    } else {
        targetCell.classList.add("two")
    }
}

function playerNames() {
    const container = document.getElementById('container')

    for (i = 1; i < 3; i++) {
        const div = document.createElement('div')
        const label = document.createElement('label')
        const input = document.createElement('input')
        const submitBtn = document.createElement('button')
        div.id = `${i}Name`
        label.innerText = `Player ${i} Name:`
        label.setAttribute("for", `${i}`)
        input.innerText = `Player ${i} Name:`
        input.setAttribute("for", `${i}`)
        input.setAttribute("id", `${i}`)
        input.setAttribute("name", `${i}`)
        submitBtn.innerText = `Player ${i} Name:`
        submitBtn.setAttribute("name", `${i}`)
        submitBtn.innerText = "Enter"
        submitBtn.addEventListener('click', e => submitName(Number(input.id), input.value))
        div.appendChild(label)
        div.appendChild(input)
        div.appendChild(submitBtn)
        container.appendChild(div)
    }
}

function submitName(playerNum, newName) {
    const nameElements = document.getElementById(`${playerNum}Name`)
    if (playerNum === 1 && newName) {
        playerController.player1.name = newName
        nameElements.innerHTML = `<h1>${playerController.player1.name} is ready</h1>`
        playerController.player1.ready = true
    } else if (playerNum === 1 && !newName){
        nameElements.innerHTML = `<h1>Player 1 is ready</h1>`
        playerController.player1.ready = true
    } 
    
    if (playerNum === 2 && newName) {
        playerController.player2.name = newName
        nameElements.innerHTML = `<h1>${playerController.player2.name} is ready</h1>`
        playerController.player2.ready = true
    } else if (playerNum === 2 && !newName) {
        nameElements.innerHTML = `<h1>Player 2 is ready</h1>`
        playerController.player2.ready = true
    }
    if (playerController.player1.ready && playerController.player2.ready) startButton()
}

function startButton() {
    console.log('start')
    const container = document.getElementById('alert')
    const startBtn = document.createElement('button')
    startBtn.innerText = "Start"
    startBtn.addEventListener('click', e => displayBoard(checkInput))
    container.insertAdjacentElement('afterend', startBtn)
}

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
    let possibleCombinations = combinations.some(possibleCombo => possibleCombo.every(index => board[index] === playerSign))
    if (possibleCombinations) {
        let winMsg = roundController.getRound() % 2 === 0 ? `<p>Player 2 wins!</p>` : `<p>Player 1 wins!</p>`
        alertMsg(winMsg)
    }
};

function alertMsg(gameEndMsg) {
    const container = document.getElementById('alert')
    container.innerHTML = `<p>${gameEndMsg}</p>`
}

// runs game
function gameController() {
    playerNames()
    // displayBoard(checkInput)
    return console.log("game running")
}

gameController()