/*
---------------------------------
  GAME LOGIC
---------------------------------
*/

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

function playRound(playerHand, npcHand) {
  let result = getWinner(playerHand, npcHand);

  let winner;
  switch (result) {
    case null:
      break;
    case playerHand:
      playerScore++;
      winner = "player";
      break;
    case npcHand:
      npcScore++;
      winner = "computer";
      break;
    default:
      console.log("An error occurred when calculating victory.");
  }

  endText = getEndText(playerHand, npcHand, result);
  setEndText(endText);

  console.log(endText);
  console.log(`The score is now ${playerScore} - ${npcScore}`);

  if(playerScore >= 5 || npcScore >= 5) {
    gameOver(winner);
  }
}

// Returns the a or b back as the winner, or null on tie
function getWinner(handA, handB) {
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

function initiateRound(playerHand) {
  playRound(playerHand, getNPCHand());
}

function getNPCHand() {
  const npcHandIndex = Math.floor(Math.random() * hands.length);
  return hands[npcHandIndex];
}


function getVerb(winner, loser) {
  const dif = (hands.length + hands.indexOf(winner) - hands.indexOf(loser)) 
      % hands.length;

  const loserVerbIndex = Math.floor(dif / 2);
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

/*
-------------------------------------
  DOM MANIPULATION
-------------------------------------
*/

const btnContainerElmt = document.querySelector("#button-container");
const resultsContainerElmt = document.querySelector("#results-container");
const promptElmt = document.querySelector("#prompt");

const defaultPromptElmtText = promptElmt.textContent;

const buttons = new Array(hands.length);
let results = new Array();
const maxResultsLength = 10;

function resetGame() {
  playerScore = 0;
  npcScore = 0;

  promptElmt.textContent = defaultPromptElmtText;
  
  for (let i = 0; i < hands.length; i++) {
    let btn = document.createElement("button");
    
    btn.textContent = hands[i];
    btn.className = "hand-button";
    btn.id = hands[i] + "-btn";
    btn.setAttribute("data-hand", hands[i]);
    
    btn.addEventListener("click", e => {
      initiateRound(e.target.getAttribute("data-hand"));
    });
  
    btnContainerElmt.appendChild(btn);
    buttons[i] = btn;
  }

  results.forEach(result => {
    resultsContainerElmt.removeChild(result);
  });
  results = [];
}

function setEndText(endText) {
  result = makeNewResultElement(endText);
  addNewResultElement(result);
  promptElmt.textContent = `Player: ${playerScore} - Computer: ${npcScore}`;
}

function makeNewResultElement(text) {
  let result = document.createElement("div");
  result.className = "result";
  result.textContent = text;
  return result;
}

function addNewResultElement(result) {
  results.unshift(result);
  resultsContainerElmt.prepend(result);

  if (results.length > maxResultsLength) {
    let removedResult = results.pop();
    resultsContainerElmt.removeChild(removedResult);
  }

  for(let i = 0; i < results.length; i++) {
    // Originally I was going to use maxResultsLength here, but the effect is too subtle
    // It might be nice to make the opacity step nonlinear...
    results[i].style.opacity = 1 - (i / results.length);
  }
}

function gameOver(winner) {
  promptElmt.textContent = `${winner} has won the match!`;
  buttons.forEach(btn => {
    btnContainerElmt.removeChild(btn);
  });

  const resetButton = document.createElement("button");
  resetButton.textContent = "Play again?";
  resetButton.className = "hand-button";
  resetButton.addEventListener("click", e => {
    resetGame();
    btnContainerElmt.removeChild(resetButton);
  });
  btnContainerElmt.appendChild(resetButton);
}

resetGame();
  