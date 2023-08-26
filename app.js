let deckId;
let scorePc = 0;
let scoreMe = 0;

const newDeckBtn = document.getElementById("new-deck");
const twoCardsBtn = document.getElementById("new-cards");
const cardImages = document.getElementById("card-images");
const messageEl = document.getElementById("message");
const scorePcEl = document.getElementById("score-pc");
const scoreMeEl = document.getElementById("score-me");
const remainingCardsEl = document.getElementById("remaining-cards");

twoCardsBtn.style.visibility = "hidden";

newDeckBtn.addEventListener("click", newDeck);
twoCardsBtn.addEventListener("click", newCards);

function newDeck() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(response => response.json())
        .then(data => {
            deckId = data.deck_id
            remainingCardsEl.textContent = `Remaining Cards: ${data.remaining}`;
            twoCardsBtn.style.visibility = "visible";
            scoreMeEl.textContent = `Me: 0`;
            scorePcEl.textContent = `Computer: 0`;
            messageEl.textContent = `Start to War!`
            scorePc = 0;
            scoreMe = 0;
        })
}


function newCards() {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(response => response.json())
        .then(data => {
            cardImages.children[0].innerHTML = `<img src="${data.cards[0].image}">`;
            cardImages.children[2].innerHTML = `<img src="${data.cards[1].image}">`;
            const cardOne = data.cards[0];
            const cardTwo = data.cards[1];
            messageEl.textContent = determineCardWinner(cardOne, cardTwo);
            remainingCardsEl.textContent = `Remaining Cards: ${data.remaining}`;
            if(data.remaining === 0) {
                twoCardsBtn.style.visibility = "hidden";
                if(scoreMe > scorePc) {
                    messageEl.innerHTML = `<strong>You Won the War! 🥳</strong>`;
                } else if(scorePc > scoreMe) {
                    messageEl.innerHTML = `<strong>You Lost the War! 😥</strong>`;
                } else {
                    messageEl.innerHTML = `<strong>It is a Tie! ⚔️</strong>`;
                }
            }
        })
}

function determineCardWinner(card1, card2) {
    const cardValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"];
    const card1Value = cardValues.indexOf(card1.value);
    const card2Value = cardValues.indexOf(card2.value);
    
    if(card1Value > card2Value) {
        scorePc++;
        scorePcEl.textContent = `Computer: ${scorePc}`;
    return "Computer Wins!";
    } else if(card2Value > card1Value) {
        scoreMe++;
        scoreMeEl.textContent = `Me: ${scoreMe}`;
        return "You Win!";
    } else {
        return "War!";
    }

}