const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGame = document.querySelector(".btn");

let currPlayer;
let gameGrid;
const winningPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
//function to initialize the game
initGame();

function initGame() {
    currPlayer = 'X';

    gameGrid = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList.remove("win");
    })
    newGame.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currPlayer}`;

}

function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currPlayer;
        gameGrid[index] = currPlayer;
        boxes[index].style.pointerEvents = "none";
        //swap turn
        swapTurn();
        checkGameOver();
    }
}

function swapTurn() {
    if (currPlayer === "X") currPlayer = "O";
    else currPlayer = "X";
    gameInfo.innerText = `Current Player - ${currPlayer}`;
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        console.log(index);
        handleClick(index);
        // newGame.classList.add("active");
    })
})

newGame.addEventListener("click", initGame);

function checkGameOver() {
    let winner = "";

    winningPosition.forEach(position => {
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {

            if (gameGrid[position[0]] === "X")
                winner = "X";

            else
                winner = "O";

            boxes.forEach(box => {
                box.style.pointerEvents = "none";
            })
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    })
    if (winner !== "") {
        gameInfo.innerText = `Winner Player - ${winner}`;
        newGame.classList.add("active");
        return;
    }
    let fillCount = 0;
    gameGrid.forEach(box => {
        if (box !== "")
            fillCount++;
    });
    if (fillCount === 9) {
        gameInfo.innerText = `Game Tied`;
        newGame.classList.add("active");
    }
}