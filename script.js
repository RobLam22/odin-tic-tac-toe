// Make Gameboard
// 0,1,2
// 3,4,5
// 6,7,8
function gameboard() {
    const rows = 3;
    const cols = 3;
    let board = ['','','','','','','','',''];
    return board
}

// Make Players
function createPlayers() {
    const playerOne = { player: "Player One", value: 1 }
    const playerTwo = { player: "Player Two", value: 2 }

    return { playerOne, playerTwo }
}

// Logic for the game
function gameLogic(cells, board, players){
    console.log(cells.id)

    // LOGIC for PLAYER INPUT

    const { playerOne, playerTwo } = players
    let playerTurn = true; // true = Player1, false = Player2
    let index = 0;

    for (i = 0; i < 9; i++) {
        const playerValue = playerTurn ? playerOne.value : playerTwo.value;
        let inputMsg = playerTurn ? "Player 1: Please choose a square" : "Player 2: Please choose a square"
        let input = cells.id
        // let input = Number(prompt(inputMsg)) // change to div and clicks
        if (board[input] === '') {
            if (playerTurn) {
                board[input] = playerValue
                index = input
                playerTurn = false
            } else if (!playerTurn) {
                board[input] = playerValue
                index = input
                playerTurn = true
            }
            console.log(board)
            if (i > 3) {
                if (winCheck(index, playerValue, board)) {
                    console.log(`${playerValue} is the winner`)
                }
            }
        }
    }
}

// Win check - still needs to finalise win condition
function winCheck(index, playerValue, board) {
    console.log(index, playerValue, board)
    const winConditions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
    let winCombos = winConditions.filter((combo) => combo.includes(index)).some(possibleCombo => possibleCombo.every(index => board[index] === playerValue))
    return true
}

// Display / DOM logic
function displayGame() {
    const container = document.getElementById('container')
    const playArea = document.createElement('div')
    playArea.classList.add('game')

    for (i = 0; i < 9; i++) {
        const div = document.createElement('div')
        div.classList.add('cell')
        div.id = i
        div.addEventListener('click', e => gameLogic(div))
        playArea.appendChild(div)
    }
    container.appendChild(playArea)
    return container
}

// Run Game
function gameController() {
    const players = createPlayers()
    const board = gameboard()
    const cells = displayGame()
    gameLogic(cells, board, players)
}

gameController()