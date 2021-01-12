const hands = ["Rock", "Paper", "Scissors"];

function game() {
  let playerScore = 0;
  let npcScore = 0;

  while (playerScore < 5 && npcScore < 5) {
    let npcHand = npcPlay();
    let playerHand = playerPlay();

    let result = getWinner(playerHand, npcHand);

    switch (result) {
      case null: 
        console.log(tie(playerHand, npcHand)); 
        break;
      case playerHand: 
        console.log(playerWins(playerHand, npcHand));
        playerScore++;
        break;
      case npcHand: 
        console.log(computerWins(playerHand, npcHand));
        npcScore++;
        break;
      default:
        console.log("An error occurred when calculating victory.");
    }

    console.log(`The score is now ${playerScore} - ${npcScore}`);
  }

  playerScore > npcScore ? 
      console.log("Player the wins match!") :
      console.log("Computer wins the match!");
}

function npcPlay() {
  const npcHandIndex = Math.floor(Math.random() * hands.length);
  return hands[npcHandIndex];
}

function playerPlay() {
  let input = prompt("Rock, Paper, or Scissors?")?.toLowerCase();
  const firstLtr = input[0].toUpperCase();
  input = input.replace(input[0], firstLtr);
  return input;
}

// Returns the a or b back as the winner, or null on tie
function getWinner(handA, handB) {
  // Check if tie
  if (handA === handB) {
    return null;
  }

  const handAIndex = hands.indexOf(handA);
  const handBIndex = hands.indexOf(handB);            

  // If either input was an invalid hand, don't declare a winner
  if (handAIndex === -1 || handBIndex === -1){
    invalidHandError([handA, handB]);
    return null;
  }

  const len = Math.floor(hands.length / 2);
  for (let i = 0; i < len; i++) {
    return handAIndex === (handBIndex + 1 + (i * 2)) % hands.length ? handA : handB;
  }
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

function invalidHandError(handList) {
  handList.forEach(hand => {
    if (hand === -1) {
      console.error(`Couldn't determine winner. Invalid hand ${hand}.`);
    }
  })
}


game();