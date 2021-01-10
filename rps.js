const hands = ["Rock", "Paper", "Scissors"];


function game() {
  let playerScore = 0;
  let computerScore = 0;

  while (playerScore < 5 && computerScore < 5) {
    let computerSelection = computerPlay();
    let playerSelection = playerPlay();

    let result = playRound(playerSelection, computerSelection);

    switch (result) {
      case -1: 
        console.log(tie(hands[playerSelection], hands[computerSelection])); 
        break;
      case 0: 
        console.log(playerWins(hands[playerSelection], hands[computerSelection]));
        playerScore++;
        break;
      case 1: 
        console.log(computerWins(hands[playerSelection], hands[computerSelection]));
        computerScore++;
        break;
      default:
        console.log("An error occurred when calculating victory. " + 
          `Expected range: [-1,1], got ${result}`);
    }

    console.log(`The score is now ${playerScore} - ${computerScore}`);
  }

  playerScore > computerScore ? 
    console.log("Player the wins match!") :
    console.log("Computer wins the match!");
}

// Return 0 if player wins, 1 if computer wins, -1 if tie
function playRound(playerSelection, computerSelection) {
  // Following the "exit early" principle
  if (playerSelection === computerSelection) {
    return -1;
  }

  if (rightOf(playerSelection, computerSelection)) {
    return 0;
  } else if (rightOf(computerSelection, playerSelection)) {
    return 1;
  }
}

function computerPlay() {
  return Math.floor(Math.random() * hands.length);
}

function playerPlay() {
  input = prompt("Rock, Paper, or Scissors?")?.toLowerCase();
  firstLtr = input[0].toUpperCase();
  input = input.replace(input[0], firstLtr);
  return hands.indexOf(input);
}

// Returns true if a is to the right of b in the hands array
// Considers loop; ie, 0 is "right" of last index
function rightOf(a, b) {
  return a === (hands.length + (b + 1)) % hands.length;
}

// GAME END STATES
function playerWins(pSelection, cSelection) {
  return `${pSelection} beats ${cSelection}. Player wins!`;
}

function computerWins(pSelection, cSelection) {
  return `${cSelection} beats ${pSelection}. Computer wins!`;
}

function tie(pSelection, cSelection) {
  return `${pSelection} and ${cSelection} tie!`;
}

game();