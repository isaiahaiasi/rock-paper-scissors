const hands = ["Rock", "Paper", "Scissors", "Spock", "Lizard"];

const rockVerbs = ["squishes", "crushes"];
const paperVerbs = ["covers", "disproves"];
const scissorsVerbs = ["cut", "decapitate"];
const spockVerbs = ["smashes", "vaporizes"];
const lizardVerbs = ["poisons", "eats"];

const verbs = new Map();
verbs.set("Rock", rockVerbs);
verbs.set("Paper", paperVerbs);
verbs.set("Scissors", scissorsVerbs);
verbs.set("Spock", spockVerbs);
verbs.set("Lizard", lizardVerbs);

let playerScore = 0;
let npcScore = 0;

function game() {

  while (playerScore < 5 && npcScore < 5) {
    let npcHand = npcPlay();
    let playerHand = playerPlay();
    playRound(playerHand, npcHand);
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

function playRound(playerHand, npcHand) {
  let result = getWinner(playerHand, npcHand);

  console.log(getEndText(playerHand, npcHand, result));

  switch (result) {
    case null: 
      break;
    case playerHand:
      playerScore++;
      break;
    case npcHand:
      npcScore++;
      break;
    default:
      console.log("An error occurred when calculating victory.");
  }

  console.log(`The score is now ${playerScore} - ${npcScore}`);
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
    if (handAIndex === (handBIndex + 1 + (i * 2)) % hands.length) {
      return handA;
    }
  }
  return handB;
}

function getVerb(winner, loser) {
  const difference = (hands.length + hands.indexOf(winner) - hands.indexOf(loser)) % hands.length;
  const loserVerbIndex = Math.floor(difference / 2);
  return verbs.get(winner)[loserVerbIndex];
}

// GAME END STATES
function getEndText(playerHand, npcHand, result) {
  switch (result) {
    case null:
      return `${playerHand} ties ${npcHand}!`;
    case playerHand:
      return `${playerHand} ${getVerb(playerHand, npcHand)} ${npcHand}! Player wins!`;
    case npcHand:
      return `${npcHand} ${getVerb(npcHand, playerHand)} ${playerHand}! Computer wins!`;
    default:
      return "Unexpected result. Couldn't make win log!";
  }
}

function invalidHandError(handList) {
  handList.forEach(hand => {
    if (hand === -1) {
      console.error(`Couldn't determine winner. Invalid hand ${hand}.`);
    }
  })
}

function testGameStates() {
  hands.forEach(handA => {
    hands.forEach(handB => {
      playRound(handA, handB);
    })
  });
}

game();