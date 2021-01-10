const hands = ["Rock", "Paper", "Scissors"];

function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return tie(hands[playerSelection], hands[computerSelection]);
  }

  if (rightOf(playerSelection, computerSelection)) {
    return playerWins(hands[playerSelection], hands[computerSelection]);
  } else if (rightOf(computerSelection, playerSelection)) {
    return computerWins(hands[playerSelection], hands[computerSelection]);
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

// (putting this in a function later)
let computerSelection = computerPlay();
let playerSelection = playerPlay();

console.log(playRound(playerSelection, computerSelection));

//PSEUDO
/*
  Instead of checking for every combo, use the relative index to get the value:
  (after checking for tie)
  If playerSelection RightOf computerSelection
    Player wins
  Else if computerSelection RightOf playerSelection
    Computer wins

  Only question is looping the index, but this should be doable with %

*/