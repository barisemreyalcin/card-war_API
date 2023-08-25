let deckId;

const newDeckBtn = document.getElementById("new-deck");
const twoCardsBtn = document.getElementById("new-cards");
const cardImages = document.getElementById("card-images");

newDeckBtn.addEventListener("click", newDeck);
twoCardsBtn.addEventListener("click", newCards);

function newDeck() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(response => response.json())
        .then(data => {
            deckId = data.deck_id
        })
}

function newCards() {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(response => response.json())
        .then(data => {
            cardImages.children[0].innerHTML = `<img src="${data.cards[0].image}">`;
            cardImages.children[1].innerHTML = `<img src="${data.cards[1].image}">`;
        })
}