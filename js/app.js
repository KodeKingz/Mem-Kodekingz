// Cards
let card = document.getElementsByClassName("card");
let cards = [...card];

// Card deck
const deck = document.getElementById("card-deck");

// Move counts
let moves = 0;
let counter = document.querySelector(".moves");

// Move count heart icons
const hearts = document.querySelectorAll(".fa-heart");

// Move count matchedCards
let matchedCard = document.getElementsByClassName("match");

 // Hearts icon
 let heartsList = document.querySelectorAll(".hearts li");

 // Collapse Heart
 let closeicon = document.querySelector(".close");

 // Open winner window
 let modal = document.getElementById("popup1")

 // Opened cards array
var openedCards = [];


// Shuffle cards
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};


// Shuffles cards when page is refreshed
document.body.onload = startGame();


// Start new game function
function startGame(){
 
    // Clear open cards
    openedCards = [];

    // Shuffle deck
    cards = shuffle(cards);
    
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    // Reset moves
    moves = 0;
    counter.innerHTML = moves;
    // Reset rating
    for (var i= 0; i < hearts.length; i++){
        hearts[i].style.color = "#FFD700";
        hearts[i].style.visibility = "visible";
    }
    //Reset timer
    second = 0;
    minute = 0; 
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}


// Open, show, disable cards
var displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};


// Check if cards matches/not match
function cardOpen() {
    openedCards.push(this);
    var len = openedCards.length;
    if(len === 2){
        moveCounter();
        if(openedCards[0].type === openedCards[1].type){
            matched();
        } else {
            unmatched();
        }
    }
};


// Matched cards
function matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}


// Non matched cards
function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "no-event","unmatched");
        openedCards[1].classList.remove("show", "open", "no-event","unmatched");
        enable();
        openedCards = [];
    },1100);
}


// Card disabler
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}


// Enable disable match/non match
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}


// Move counter
function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    //start timer on first click
    if(moves == 1){
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
    }
    // setting rates based on moves
    if (moves > 1 && moves < 4){
        for( i= 0; i < 3; i++){
            if(i > 1){
                hearts[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 4){
        for( i= 0; i < 3; i++){
            if(i > 0){
                hearts[i].style.visibility = "collapse";
            }
        }
    }
}


// Timer
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}


// Congratulations when matching all cards
function congratulations(){
    if (matchedCard.length == 16){
        clearInterval(interval);
        finalTime = timer.innerHTML;

        // congratulations window
        modal.classList.add("show");

        // Heart rating 
        var heartRating = document.querySelector(".hearts").innerHTML;

        //showing move, rating, window
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("heartRating").innerHTML = heartRating;
        document.getElementById("totalTime").innerHTML = finalTime;

        //Icon on window
        closeModal();
    };
}


// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click",congratulations);
};

// close icon on window
function closeModal(){
    closeicon.addEventListener("click", function(e){
        modal.classList.remove("show");
        startGame();
    });
}


// Play Again 
function playAgain(){
    modal.classList.remove("show");
    startGame();
}



