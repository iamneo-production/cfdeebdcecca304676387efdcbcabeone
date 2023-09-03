// Initial game state
let cells = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let result = document.querySelector('.result');
let btns = document.querySelectorAll('.btn');
let conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let gameOver = false;

// Function to handle player moves
const ticTacToe = (element, index) => {
    // Check if the cell is already filled and the game is not over
    if (cells[index] === '' && !gameOver) {
        // Fill the cell with the current player's symbol (X or O)
        cells[index] = currentPlayer;
        element.textContent = currentPlayer;
        element.disabled = true; // Disable the button after a move

        // Check for a win after each move
        checkWin();

        // Update the current player's turn
        togglePlayer();
    }
};

// Function to check for a win
function checkWin() {
    for (let condition of conditions) {
        const [a, b, c] = condition;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            result.textContent = `Player ${currentPlayer} wins!`;
            result.style.color = 'green';
            gameOver = true; // Set the game to be over
            disableButtons(); // Disable all buttons
            return;
        }
    }

    if (cells.includes('')) {
        result.textContent = "It's a draw!";
        result.style.color = 'orange';
        gameOver = true; // Set the game to be over
    }
}

// Function to display the current player's turn
function displayCurrentPlayerTurn() {
    result.textContent = `Player ${currentPlayer}'s turn`;
}

// Function to disable all buttons
function disableButtons() {
    btns.forEach((button) => {
        button.disabled = true;
    });
}

// Function to toggle the current player
function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    displayCurrentPlayerTurn();
}

// Initialize the game
displayCurrentPlayerTurn();

// Function to reset the game
const resetGame = () => {
    // Reset the game state
    cells = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false; // Set the game to not be over

    // Update the 'result' element to indicate the current player's turn
    displayCurrentPlayerTurn();

    // Re-enable all buttons for a new game
    btns.forEach((button) => {
        button.textContent = '';
        button.disabled = false;
    });
};

// Add an event listener to the reset button
document.querySelector('#reset').addEventListener('click', resetGame);

// Add event listeners to the buttons
btns.forEach((btn, i) => {
    btn.addEventListener('click', () => ticTacToe(btn, i));
});
