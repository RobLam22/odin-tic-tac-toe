// make game board
// make player objects with 1 / 2 to replace cells on game board
// check valid player inputs / game end checks

// Make Gameboard
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
function gameLogic(board, players) {
    const { playerOne, playerTwo } = players
    let playerTurn = true; // true = Player1, false = Player2
    let index = 0;
    
    // board = [1,1,1,'','','','','','']
    // console.log(board[8])
    // winCheck(board[0])

    // LOGIC for PLAYER INPUT

    for (i = 0; i < 9; i++) {
        const playerValue = playerTurn ? playerOne.value : playerTwo.value;
        let inputMsg = playerTurn ? "Player 1: Please choose a square" : "Player 2: Please choose a square"
        let input = Number(prompt(inputMsg)) // change to div and clicks
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
                    break
                }
            }
        }
    }
}

// 0,1,2
// 3,4,5
// 6,7,8

// Win check - still needs to finalise win condition
function winCheck(index, playerValue, board) {
    console.log(index, playerValue, board)
    const winConditions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
    let winCombos = winConditions.filter((combo) => combo.includes(index)).some(possibleCombo => possibleCombo.every(index => board[index] === playerValue))
    return true

}

// Run Game
function gameController() {
    const board = gameboard()
    const players = createPlayers()
    gameLogic(board, players)
}

gameController()