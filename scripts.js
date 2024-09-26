console.log("Welcome Again:");

let boxes = document.querySelectorAll(".box");
const GameInfo = document.querySelector(".game_info");
const newGamebutton = document.querySelector(".btn");

let CurrentPlayer;
let gameGrid;
const winningposition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
// function to initialize .
function InitGame() {
  CurrentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  //   UI initialization to start over again.
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    // Initializing the default css properties.
    box.classList= `box box${index+1}`;
  });
  GameInfo.innerText = `Current Player - ${CurrentPlayer}`;
  newGamebutton.classList.remove("active");
  
}
InitGame();
// Swap function to swap the turn.
function swapTurn() {
  if (CurrentPlayer === "X") {
    CurrentPlayer = "0";
  } else {
    CurrentPlayer = "X";
  }
  GameInfo.innerText = `Current Player - ${CurrentPlayer}`;
}
function checkGameOver() {
  let answer = "";

  winningposition.forEach((position) => {
    // check if grid has value or it doesn't contains any value
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
       gameGrid[position[2]]  !== "") &&
      gameGrid[position[0]] == gameGrid[position[1]] &&
      gameGrid[position[1]] == gameGrid[position[2]]
    ) {
      // check if winner is X
      if (gameGrid[position[0]] == "X") {
        answer = "X";
      } else {
        answer = "0";
      }
    //   disable pointer event.
    boxes.forEach((box)=>{
        box.style.pointerEvents ="none";

    });
      // Now we know X/0 is winner.
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });
  if(answer !== "") {
    GameInfo.innerText = `Winner Player-${answer}`;
    newGamebutton.classList.add("active");
    return;
  }
// check whether there is a winner or game tie.
let fillCount = 0;
gameGrid.forEach((box)=>{
if(box!=="")
    fillCount++;
});
if(fillCount ==9){
    GameInfo.innerText = `Game Tied`;
    newGamebutton.classList.add('active')
}
}
function handleClick(index) {
  if (gameGrid[index] === "") {
    // UI updation.
    boxes[index].innerText = CurrentPlayer;
    gameGrid[index] = CurrentPlayer;
    boxes[index].style.pointerEvent = "none";

    // now swap turn.
    swapTurn();
    // check Gameover
    checkGameOver();
  }
}
boxes.forEach((box, index) =>
  box.addEventListener("click", () => handleClick(index))
);

newGamebutton.addEventListener("click", InitGame);
