const gameBoard = document.getElementById('game-board');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('reset-btn');

// Icons for the cards
const icons = ['🐦', '🐦', '🐤', '🐤', '🦉', '🦉', '🦆', '🦆', '🦢', '🦢', '🦚', '🦚'];

// Shuffle function (Fisher-Yates)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let shuffledIcons = shuffle([...icons]);
let firstCard = null;
let secondCard = null;
let matchedPairs = 0;
let attempts = 0;

function createBoard() {
    shuffledIcons.forEach((icon, index) => {
        const card = document.createElement('div');
        card.classList.add('card', 'hidden');
        card.dataset.icon = icon;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (this.classList.contains('matched') || this === firstCard) return;

    this.classList.remove('hidden');
    this.textContent = this.dataset.icon;

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        attempts++;
        statusText.textContent = `Jogadas: ${attempts}`;
        checkForMatch();
    }
}

function checkForMatch() {
    if (firstCard.dataset.icon === secondCard.dataset.icon) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedPairs++;

        if (matchedPairs === icons.length / 2) {
            statusText.textContent = `Você ganhou! Jogadas: ${attempts}`;
            resetBtn.style.display = 'block';
        }

        resetSelection();
    } else {
        setTimeout(() => {
            firstCard.classList.add('hidden');
            secondCard.classList.add('hidden');
            firstCard.textContent = '';
            secondCard.textContent = '';
            resetSelection();
        }, 1000);
    }
}

function resetSelection() {
    firstCard = null;
    secondCard = null;
}

resetBtn.addEventListener('click', resetGame);

function resetGame() {
    gameBoard.innerHTML = '';
    shuffledIcons = shuffle([...icons]);
    matchedPairs = 0;
    attempts = 0;
    statusText.textContent = '';
    resetBtn.style.display = 'none';
    createBoard();
}

createBoard();
