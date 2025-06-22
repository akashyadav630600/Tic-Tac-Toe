let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset-btn');
let newGameBtn = document.querySelector('#new-btn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');

let turn0 = true; // true = 0, false = X

// Winning combinations
const winPatterns = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

// Function to disable all buttons after win
const disableBoxes = () => {
  boxes.forEach(box => box.disabled = true);
};

// Show winner message
const showWinner = (winner) => {
  msg.innerText = `🎉 Congratulations! Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Check winner after every move
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {
        showWinner(pos1);
        return;
      }
    }
  }
};

// Main game logic
boxes.forEach(box => {
  box.style.fontSize = "2rem";
  box.style.fontWeight = "bold";
  box.style.textAlign = "center";

  box.addEventListener("click", () => {
    if (turn0) {
      box.innerText = "0";
      box.style.color = "blue";
      turn0 = false;
    } else {
      box.innerText = "X";
      box.style.color = "red";
      turn0 = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

// Reset board
const resetGame = () => {
  turn0 = true;
  boxes.forEach(box => {
    box.innerText = "";
    box.disabled = false;
  });
  msgContainer.classList.add("hide");
};

// Button actions
resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
