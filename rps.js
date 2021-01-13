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
      winner = "Player";
      break;
    case npcHand:
      npcScore++;
      winner = "Computer";
      break;
    default:
      console.log("An error occurred when calculating victory.");
  }

  endText = getEndText(playerHand, npcHand, result);
  updateDOMRoundEnd(endText, playerHand, npcHand, result);

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
  // This should probably be a separate file, but they're pretty tightly coupled
  // And I haven't learned how to carry references between files yet
-------------------------------------
*/
// ASSETS
// (I know this is a stupid place for them, but I don't know the right way to do it??)
const imgSkull = "imgs/skull.svg";
const imgParty = "imgs/party.svg";
const imgArrow = "imgs/arrow.svg";

const handImgMap = new Map();
handImgMap.set("Rock", "imgs/rock.svg");
handImgMap.set("Paper", "imgs/paper.svg");
handImgMap.set("Scissors", "imgs/scissors.svg");
handImgMap.set("Lizard", "imgs/lizard.svg");
handImgMap.set("Spock", "imgs/spock.svg");

const mainElmt = document.querySelector("main");
const btnContainerElmt = mainElmt.querySelector("#button-container");
const resultsContainerElmt = mainElmt.querySelector("#results-container");
const playerScoreElmt = mainElmt.querySelector("#player-score");
const npcScoreElmt = mainElmt.querySelector("#npc-score");

const playerHandImg = mainElmt.querySelector("#player-hand-img");
const npcHandImg = mainElmt.querySelector("#npc-hand-img");
const handArrowImg = mainElmt.querySelector("#hand-arrow-img");

playerHandImg.setAttribute("src", imgSkull);
npcHandImg.setAttribute("src", imgParty);
handArrowImg.setAttribute("src", imgArrow);

const buttons = new Array(hands.length);

let results = new Array();
const maxResultsLength = 10;

function resetGame() {
  playerScore = 0;
  npcScore = 0;
  
  playerScoreElmt.textContent = 0;
  npcScoreElmt.textContent = 0;

  playerHandImg.setAttribute("src", "");
  npcHandImg.setAttribute("src", "");
  handArrowImg.setAttribute("src", "");
  

  for (let i = 0; i < hands.length; i++) {
    let btn = document.createElement("button");
    
    btn.className = "hand-button";
    btn.id = hands[i] + "-btn";
    btn.setAttribute("data-hand", hands[i]);
    let btnIcon = document.createElement("img");
    btnIcon.setAttribute("src",handImgMap.get(hands[i]));
    btnIcon.setAttribute("data-hand", hands[i]);
    btn.appendChild(btnIcon);
    //btn.textContent = hands[i];
    
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

function updateDOMRoundEnd(endText, playerHand, npcHand, winner) {

  playerScoreElmt.textContent = playerScore;
  npcScoreElmt.textContent = npcScore;

  playerHandImg.setAttribute("src", handImgMap.get(playerHand));
  npcHandImg.setAttribute("src", handImgMap.get(npcHand));

  if (winner === playerHand) {
    handArrowImg.setAttribute("src", imgArrow);
    handArrowImg.style="transform: scaleX(1);"
  } else if (winner === npcHand) {
    handArrowImg.setAttribute("src", imgArrow);
    handArrowImg.style="transform: scaleX(-1);"
  } else {
    handArrowImg.setAttribute("src", handImgMap.get("Rock"));
  }

  addNewResultElement(endText);
}

function addNewResultElement(text) {
  let result = document.createElement("div");
  result.className = "result";
  result.textContent = text;
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
  let endImg;
  let endMsg;
  if (winner === "Player") {
    endImg = imgParty;
    endMsg = "Congratulations! Play again, or check out my Github for more cool projects!";
  } else {
    endImg = imgSkull;
    endMsg = "Too bad! For some PRO STRATS, check out my Github!"
  }

  addNewResultElement(endMsg);

  playerHandImg.setAttribute("src", endImg);
  npcHandImg.setAttribute("src", endImg);
  handArrowImg.setAttribute("src", endImg);

  buttons.forEach(btn => {
    btnContainerElmt.removeChild(btn);
  });

  const resetButton = document.createElement("button");
  resetButton.textContent = "Play again?";
  resetButton.className = "hand-button";
  resetButton.addEventListener("click", e => {
    btnContainerElmt.removeChild(gitHubButton);
    resetGame();
    btnContainerElmt.removeChild(resetButton);
  });

  const gitHubButton = document.createElement("a");
  gitHubButton.textContent = "github";
  gitHubButton.className = "hand-button";
  gitHubButton.setAttribute("href","https://github.com/isaiahaiasi/rock-paper-scissors");
  
  btnContainerElmt.appendChild(resetButton);
  btnContainerElmt.appendChild(gitHubButton);
}

resetGame();
  