
function flip(card) {
    if (game.setCard(card.id)) {
        // Here i flip the clicked card
        card.classList.add("flip")
    };
    if (game.secondCard) {
        //if any card has been inserted in "secondCard", check for match
        if (game.checkMatch()) {
            if (game.cards.every((card) => card.flipped === true)) {
                //if every cards has flipped, it means the game is over
                win();
            }

            let firstCard = document.getElementById(game.firstCard.id).children[0];
            let secondCard = document.getElementById(game.secondCard.id).children[0];
            //Here i get the cardFront of card

            firstCard.children[0].classList.add("match");
            secondCard.children[0].classList.add("match");
            //And here i get the image of cardFront and add the class

            game.continueGame();

        }
        else {
            //if don't have a match, unflip the cards

            setTimeout(() => {
                let firstCard = document.getElementById(game.firstCard.id);
                let secondCard = document.getElementById(game.secondCard.id);

                firstCard.classList.remove("flip");
                secondCard.classList.remove("flip");
                game.unflipCards()
            }, 700)
        }
    }


}


function timeFormat(time, t) {
    //this function format the time to "01, 02, 03 ...09, 10"
    if ((("0") + t).length <= 2) {
        time.innerHTML = "0" + t;
    }

    else {
        time.innerHTML = t;
    }
}



function startGame() {
    //this function create the cards and shuffles them
    let loginScreen = document.querySelector(".loginScreen");
    let inputName = document.querySelector(".inputName");
    if (inputName.value.trim() !== "") {
        //check if the input of name is not empty
        inputName.classList.remove("error")
        loginScreen.classList.add("disappear")

        cards = game.createCard();
        game.shuffleCards(cards);
        createBoard();
        chronometer.start();

    }
    else {
        inputName.classList.add("error")
        inputName.value = ""
    }

}



function createBoard() {
    //this function add the cards on the board in html
    let board = document.querySelector(".board")
    for (let card of cards) {
        board.innerHTML += '<div class="card" onclick="flip(this)" id="' + card.id + '" data-icon="' + card.icon + '"><div class="cardFront"><img src="./assets/' + card.icon + '.png" alt=""></div><div class="cardBack">&lt/&gt</div></div>'

    }
}

function win() {
    //this function push the win screen and stop the chronometer
    let winScreen = document.querySelector(".winScreen");
    let playerTime = document.getElementById("playerTime");
    let minutes = document.getElementById("minutes").innerHTML;
    let seconds = document.getElementById("seconds").innerHTML;

    winScreen.classList.remove("disappear")
    chronometer.stop();
    inputPlayer();
    createPodium();
    playerTime.innerHTML = "Your time: " + minutes+ ":" + seconds
}

function restart() {
    //this function restart the game
    let board = document.querySelector(".board")
    let winScreen = document.querySelector(".winScreen")
    let loginScreen = document.querySelector(".loginScreen");

    let minutes = document.getElementById("minutes");
    let seconds = document.getElementById("seconds");

    winScreen.classList.add("disappear");
    board.innerHTML = "";
    seconds.innerHTML = "00"
    minutes.innerHTML = "00"
    startGame();




}

function createPodium() {
    //this function create the ordened podium
    let ordenedPodium = players.sort(game.orderPodium);
    let podium = document.querySelector(".leaderBoard");
    let i = 1;

    podium.innerHTML = ""
    for (player of ordenedPodium) {

        podium.innerHTML += '<tr><td class="rank">' + i + '</td><td class="player">' + player.name + '</td><td class="time">' + player.minutes + ":" + player.seconds + '</td></tr> '
        i++;
    }
}