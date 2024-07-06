let playerText = document.getElementById("playertxt");
let restartBtn = document.getElementById("restart");
let boxes = Array.from(document.getElementsByClassName('box'));
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning_blocks');

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition;
        if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) {
            return [a, b, c];
        }
    }
    return false;
}

const startGame = () => {
    boxes.forEach(box => box.addEventListener("click", boxClicked));
};
let count = 0

function boxClicked(e) {
    const id = e.target.id;
    count+=1
    if (!spaces[id] && count<10) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;
        if (playerHasWon() !== false) {
            playerText.innerText = `${currentPlayer} Has won!`;
            let winningBlocks = playerHasWon();
            winningBlocks.map(box => boxes[box].style.backgroundColor = winnerIndicator);
            count = 10
            return;
        }

        currentPlayer = currentPlayer === X_TEXT ? O_TEXT : X_TEXT;
    }
}

restartBtn.addEventListener('click', restart);

function restart() {
    spaces.fill(null);
    boxes.forEach(box => {
        box.innerText = "";
        box.style.backgroundColor = ""; // Clear the background color
    });
    currentPlayer = X_TEXT;
    playerText.innerText = "TIC TAC TOE";
    count = 0
}

startGame();
