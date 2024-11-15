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

// Logic for a player turn
function gameLogic(board, players) {
    const { playerOne, playerTwo } = players
    for (i = 0; i < 9; i++) {
        let input = Number(prompt("Please choose a square [0-9]"))
        if (board[input] === '') {
            board[input] = 'X'
            console.log(board)
            // check win after 5 squares full
        }
    }
}

function winCheck() {
    
}

// Run Game
function gameController() {
    const board = gameboard()
    const players = createPlayers()
    gameLogic(board, players)
}

gameController()