const emojis = ["🐶", "🐱", "🦊", "🐼", "🐸", "🐵", "🐯", "🐰"];
let cardValues = [...emojis, ...emojis]; //'...' is a spread operator..and 'emojis' is the above array here..and this is how we are dupicating the array

const gameBoard = document.getElementById("game-board");
let reset = document.querySelector(".reset");
let firstCard = null;
let secondCard = null;
let lockBoard = false;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createBoard() {
  const shuffled = shuffle(cardValues);
  shuffled.forEach((emoji, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    card.innerHTML = ""; // hidden at first
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard || this.classList.contains("flipped")) return;

  this.classList.add("flipped");
  this.innerHTML = this.dataset.emoji;

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
    // Match
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    resetCards();
  } else {
    // Not match
    setTimeout(() => {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      firstCard.innerHTML = "";
      secondCard.innerHTML = "";
      resetCards();
    }, 1000);
  }
}

function resetCards() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

createBoard();

reset.addEventListener("click", () => {
  gameBoard.innerHTML = "";
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  createBoard();
});
