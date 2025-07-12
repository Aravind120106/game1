
const emojis =['😆','😅','🤥','😱','❤️','🍌','🕳️','🤰'];
const cards = [...emojis, ...emojis]; 
let flippedCards = [];
let matchedPairs = 0;


function initGame() {
  const board = document.getElementById('board');
  board.innerHTML = '';
  matchedPairs = 0;
  flippedCards = [];

  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  cards.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="front">${emoji}</div>
      <div class="back"></div>
    `;
    card.addEventListener('click', () => flipCard(card, index));
    board.appendChild(card);
  });
}


function flipCard(card, index) {

  if (card.classList.contains('flipped') || 
      flippedCards.length === 2 || 
      flippedCards.includes(index)) return;

  card.classList.add('flipped');
  flippedCards.push(index);


  if (flippedCards.length === 2) {
    const [firstIndex, secondIndex] = flippedCards;
    if (cards[firstIndex] === cards[secondIndex]) {
     
      matchedPairs++;
      flippedCards = [];
      if (matchedPairs === emojis.length) {
        setTimeout(() => alert('You won!'), 500);
      }
    } else {
   
      setTimeout(() => {
        document.querySelectorAll('.card')[firstIndex].classList.remove('flipped');
        document.querySelectorAll('.card')[secondIndex].classList.remove('flipped');
        flippedCards = [];
      }, 1000);
    }
  }
}


document.addEventListener('DOMContentLoaded', initGame);