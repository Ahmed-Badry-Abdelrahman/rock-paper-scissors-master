let arrayCards = Array.from(document.querySelectorAll('.cards .card'));
let triangle = document.querySelector('.triangle');
let step1CardSec = document.querySelector('.step1-card-sec');
let step2CardSec = document.querySelector('.step2-card-sec');
let step2Cards = document.querySelector('.step2-cards');
let playAgin = document.querySelector('.play-agin');
let playAginParagraph = document.querySelector('.play-agin p');
let btnPaly = document.querySelector('#btn-paly');
let score = document.querySelector('#score');
let rules = document.querySelector('.rules');
let closeRules = document.querySelector('#close-rules');
let rulesBtn = document.querySelector('.rules-btn');
let pickInfo = document.querySelector('.pick-info');
let spans ;

// y => paper           c => paper       win
// y => paper           c => rock        win
// y => scissors        c => paper       win
// y => scissors        c => scissors    win
// y => rock            c => rock        win
// y => rock            c => scissors    win



let yourPick;
let comPick;

if (sessionStorage.score != null) {
    score.innerHTML = JSON.parse(sessionStorage.score);
} else {
    score.innerHTML = 0
}

arrayCards.forEach((card) => {
    card.onclick = function () {
        triangle.style.display = 'none'

        yourPick = card.getAttribute('data-type')

        step1CardSec.style.display = 'none';

        showYourPick(yourPick);

        setTimeout(() => {
            showComputerPick();
        }, 500)

        setTimeout(() => {
            playAgin.style.display = 'block';
            if ((yourPick == 'paper' && comPick == 'paper') || (yourPick == 'paper' && comPick == 'rock') ||
                (yourPick == 'scissors' && comPick == 'scissors') || (yourPick == 'scissors' && comPick == 'paper') ||
                (yourPick == 'rock' && comPick == 'rock') || (yourPick == 'rock' && comPick == 'scissors')) {
                arrayCards.forEach ((card) => {
                    if (card.getAttribute('data-type') == yourPick) {
                        let spans = Array.from(card.children);
                        spans.forEach((span) => {
                            span.classList.add('animation')
                        })
                    }
                })
                playAginParagraph.append(document.createTextNode('You Win'))
                score.innerHTML = (parseInt(score.innerHTML) + 1)
                sessionStorage.score = JSON.stringify(parseInt(score.innerHTML))
            } else {
                spans.forEach((span) => {
                    span.classList.add('animation')
                })
                playAginParagraph.append(document.createTextNode('You Lose'))
                score.innerHTML = (parseInt(score.innerHTML) - 1)
                sessionStorage.score = JSON.stringify(parseInt(score.innerHTML))
            }
        }, 1000)


        step2Cards.classList.add('stopUse');
        pickInfo.style.display = 'flex'
    }
})




function showYourPick(yourPick) {
    arrayCards.forEach((card) => {
        if (card.getAttribute('data-type') == yourPick) {
            card.classList.add(yourPick);
            step2Cards.append(card);
        }
    })
    step2CardSec.style.display = 'block';
}

function showComputerPick() {
    let comPickIndex = Math.floor(Math.random() * 3);
    let comPickCard = arrayCards[comPickIndex].cloneNode(true); // Clone the card
    comPickCard.classList.add('clone');
    spans = Array.from(comPickCard.children);
    // Add the class to the cloned card
    comPickCard.classList.add(comPickCard.getAttribute('data-type'));

    // Append the cloned card to step2Cards
    step2Cards.appendChild(comPickCard);

    comPick = arrayCards[comPickIndex].getAttribute('data-type');
}

// ...

btnPaly.onclick = function () {
    window.location.reload()
    if (sessionStorage.score != null) {
        score.innerHTML = JSON.parse(sessionStorage.score);
    }
};

rulesBtn.onclick = function () {
    rules.style.display = 'flex';
    rules.style.flexDirection= 'column';
}

closeRules.onclick = function () {
    rules.style.display = 'none'
}

function winEffect () {
}