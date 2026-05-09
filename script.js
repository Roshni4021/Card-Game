let gameContainer = document.querySelector(".game-container");
let cardArray = Array.from(gameContainer.children);

cardArray.sort(() => 0.5 - Math.random());

cardArray.forEach(card => gameContainer.appendChild(card));

let cards = document.querySelectorAll(".card");
let firstCard = null;
let secondCard = null;
let attempts = 0;
let matchedPairs = 0;

cards.forEach(card => {

    card.addEventListener("click", () => flipCard(card));
});

function flipCard(card) {
    if (card.classList.contains("flipped") || secondCard) return;

    card.classList.add("flipped");
    card.innerText = card.dataset.value;
    card.style.backgroundColor = card.dataset.value;


    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        attempts++;
        document.getElementById("attempts").innerText = attempts;
        checkMatch();
    }
}

function checkMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        matchedPairs++;
        resetSelection();
        if (matchedPairs === cards.length / 2) {
            document.getElementById("message").innerText = "🎉 Congratulations! You Won 🎉";
            startConfetti();

        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            firstCard.innerText = "";
            secondCard.innerText = "";
            firstCard.style.backgroundColor = "lightblue";
            secondCard.style.backgroundColor = "lightblue";

            resetSelection();
        }, 1000);
    }
}

function resetSelection() {
    firstCard = null;
    secondCard = null;
}

function resetGame() {
    attempts = 0;
    matchedPairs = 0;
    document.getElementById("attempts").innerText = 0;
    document.getElementById("message").innerText = "";
    cards.forEach(card => {
        cards.forEach(card => {
            card.classList.remove("flipped");
            card.innerText = "";
            card.style.backgroundColor = "lightblue";
        });
        function startConfetti() {
            let container = document.getElementById("confetti-container");

            for (let i = 0; i < 100; i++) {
                let confetti = document.createElement("div");
                confetti.classList.add("confetti");

                confetti.style.left = Math.random() * 100 + "vw";
                confetti.style.backgroundColor =
                    ["red", "yellow", "green", "blue", "purple", "pink"]
                    [Math.floor(Math.random() * 6)];

                container.appendChild(confetti);

                setTimeout(() => {
                    confetti.remove();
                }, 3000);
            }
        }


    });
}
