function ageInDays(){
    let birthYear = prompt("What year were you born in?");
    let convertedToDays = (2021 - birthYear) * 365;
    let h1 = document.createElement('h1');
    let textAnswer = document.createTextNode("You are here for " + convertedToDays + " days");
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}

function reset(){
    document.getElementById("ageInDays").remove();
}


//Challenge 2: Cat generator
function generateCat(){
    let image = document.createElement('img');
    let div = document.getElementById('flex-cat-gen');
    image.src = "https://media1.giphy.com/media/jpbnoe3UIa8TU8LM13/200.gif";
    div.appendChild(image);
}

//Challenge 3: rps game
function rpsGame(yourChoice){
    let humanChoice, botChoice;
    humanChoice = yourChoice.id; //creates human choice
    //creates bot choice. Gets appended later
    let rpsArray = ["rock", "paper", "scissors"];
    botChoice = rpsArray[Math.floor(Math.random()*rpsArray.length)];
    let botChoiceIMG = document.createElement("img");
    botChoiceIMG.src = document.getElementById(botChoice).src;
    
    
    //appends humans choice as an image
    let div = document.getElementById("flex-box-rps-div");
    div.innerHTML = "";
    let image = document.createElement("img");  
    image.src = yourChoice.src;
    div.appendChild(image);
    
    console.log("human choice = " + humanChoice);
    console.log("bot choice = " + botChoice);
    let result, statusColor;
    let gameStatus = document.createElement("img"); 
    //checks if the human won 
    if(botChoice === humanChoice){
        result = "tie";        
        gameStatus.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp7kJdMZDm7UMSKR13ivd7wpDcopS2f8218w&usqp=CAU"; //generates a "tie" image  
        statusColor = "yellow";
    }
    else if((humanChoice === "rock" && botChoice === "scissors") || (humanChoice === "paper" && botChoice === "rock") || (humanChoice === "scissors" && botChoice === "paper")){
        result = "you won";
        gameStatus.src = "https://www.meme-arsenal.com/memes/af1a3e2f553bef478e4ed196ec08c7ea.jpg"; //generates "you won" image
        statusColor = "green";
    }
    else{
        result = "you lost";
        gameStatus.src = "https://media.makeameme.org/created/you-lost-and-5c795e.jpg"; //generates "you lost" image
        statusColor = "red";
    }
    console.log(result);
    div.appendChild(gameStatus);
    div.appendChild(botChoiceIMG);
    div.style.background = statusColor; 
}

//Challenge 4
let all_buttons = document.getElementsByTagName("button");
//Create copy of all buttons for reset function
var copyAllButtons = [];
for(let i = 0; i < all_buttons.length; i++){
    copyAllButtons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(buttonThingy){
    function randomBtnColor(){
        let randomBtnColorArray = ["btn-primary", "btn-success", "btn-info", "btn-warning", "btn-danger"];
        for(let i = 0; i < all_buttons.length; i++){
            all_buttons[i].classList.remove(all_buttons[i].classList[1]);
            all_buttons[i].classList.add(randomBtnColorArray[Math.floor(Math.random()*randomBtnColorArray.length)]);
        }
    }

    function changeBtnColor(changeBtnColorTo){
        for(let i =0; i < all_buttons.length; i++){
            all_buttons[i].classList.remove(all_buttons[i].classList[1]);
            all_buttons[i].classList.add(changeBtnColorTo === "green" ? "btn-success" : "btn-danger");
        }
    }

    function resetBtnColor(){
        for(let i = 0; i < all_buttons.length; i++){
            all_buttons[i].classList.remove(all_buttons[i].classList[1]);
            all_buttons[i].classList.add(copyAllButtons[i]);
        }
    }
   
    switch(buttonThingy.value){
        case "random":
            randomBtnColor();
            break;
        case "red":
            changeBtnColor("red");
            break;
        case "green":
            changeBtnColor("green");
            break;
        case "reset":
            resetBtnColor();
            break;
    }
}

//Challenge 5: Blackjack
let blackjackGame = {
    "you": {"scoreSpan": "#your-blackjack-result", "div": "#your-box", "score": 0},
    "dealer": {"scoreSpan": "#dealer-blackjack-result", "div": "#dealer-box", "score": 0},
    "cards": ["2", "3", "4", "5", "6", "7", "8", "9", "10", "K", "J", "Q", "A"],
    "cardsMap": {"2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10, "K": 10, "J": 10, "Q": 10, "A": [1, 11]},
    "wins": 0,
    "loses": 0,
    "draws": 0,
    "isStand": false,
    "turnsOver": false,
    
};

const YOU = blackjackGame["you"];
const DEALER = blackjackGame["dealer"];

const HIT_SOUND = new Audio("static/sounds/swish.m4a");
const WIN_SOUND = new Audio("static/sounds/cash.mp3");
const LOSE_SOUND = new Audio("static/sounds/aww.mp3");
HIT_SOUND.volume = 0.2;
WIN_SOUND.volume = 0.1;
LOSE_SOUND.volume = 0.1;

document.querySelector("#blackjack-hit-btn").addEventListener("click", blackjackHit);
document.querySelector("#blackjack-stand-btn").addEventListener("click", blackjackStand);
document.querySelector("#blackjack-deal-btn").addEventListener("click", blackjackDeal);

function blackjackHit(){
    if(!blackjackGame.isStand){
        let card = randomCard();
        updateScore(card, YOU);
        showScore(YOU);
        showCard(YOU, card);
    }   
    console.log("blackjackGame.isStand = " + blackjackGame.isStand);
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function blackjackStand(){
    blackjackGame.isStand = true;
    if(!blackjackGame.turnsOver)
    {     
        while(DEALER.score <= 15)
        {          
            let card = randomCard();
            updateScore(card, DEALER);
            showScore(DEALER);
            showCard(DEALER, card);
            await sleep(600);
        }   
        blackjackGame.turnsOver = true;
        updateResultTable(); 
    }
    
    console.log("blackjackGame.turnsOver = " + blackjackGame.turnsOver);
}

function randomCard(){
    let randomIndex = Math.floor(Math.random() * blackjackGame.cards.length);
    return blackjackGame.cards[randomIndex];
}

function updateScore(card, activePlayer){
    if(card === "A" && activePlayer.score + blackjackGame.cardsMap[card][1] <= 21){
        return activePlayer.score += blackjackGame.cardsMap[card][1]; //+11
    }
    else if(card === "A"){
        return activePlayer.score += blackjackGame.cardsMap[card][0];//+1
    }  
    return activePlayer.score += blackjackGame.cardsMap[card];   
}

function showScore(activePlayer){
    if(activePlayer.score <= 21){
        document.querySelector(activePlayer.scoreSpan).textContent = activePlayer.score;
    }
    else{
        document.querySelector(activePlayer.scoreSpan).textContent = "Bust!";
        document.querySelector(activePlayer.scoreSpan).style.color = "red";
    }
    
}

function showCard(activePlayer, card){
    if(activePlayer.score <= 21){
        let cardImage = document.createElement("img");
        cardImage.src = `static/images/${card}.png`;
        document.querySelector(activePlayer["div"]).appendChild(cardImage);
        HIT_SOUND.play();
    }  
}

function blackjackDeal(){
    if(blackjackGame.turnsOver === true){
        let yourImages = document.querySelector("#your-box").querySelectorAll("img");
        let dealerImages = document.querySelector("#dealer-box").querySelectorAll("img");
        for(let i = 0; i < yourImages.length; i++){
            yourImages[i].remove();
        } 
        for(let i = 0; i < dealerImages.length; i++){
            dealerImages[i].remove();
        }   
        blackjackGame.isStand = false;
        blackjackGame.turnsOver = false;
        resetLetsPlay();
        clearScore(YOU);
        clearScore(DEALER);
        resetSpanColor(YOU);
        resetSpanColor(DEALER);
    }  
}

function clearScore(activePlayer){
    activePlayer.score = 0;
    document.querySelector(activePlayer.scoreSpan).textContent = activePlayer.score;
}

function resetSpanColor(activePlayer){
    document.querySelector(activePlayer.scoreSpan).style.color = "white";
}

function updateResultTable(){ 
    let message, messageColor;
    if(YOU.score > 21 && DEALER.score > 21){
        blackjackGame.draws++;
        document.querySelector("#draws").textContent = blackjackGame.draws;
        message = "You got a draw!";
        messageColor = "orange";
    }
    else if(YOU.score > 21){
        blackjackGame.loses++;
        document.querySelector("#loses").textContent = blackjackGame.loses;
        LOSE_SOUND.play();
        message = "You lost!";
        messageColor = "red";
    }
    else if(DEALER.score > 21 || YOU.score > DEALER.score){
        blackjackGame.wins++;
        document.querySelector("#wins").textContent = blackjackGame.wins;
        WIN_SOUND.play();
        message = "You won!";
        messageColor = "green";
    }
    else if(YOU.score < DEALER.score){
        blackjackGame.loses++;
        document.querySelector("#loses").textContent = blackjackGame.loses;
        LOSE_SOUND.play();
        message = "You lost!";
        messageColor = "red";
    }
    else{
        blackjackGame.draws++;
        document.querySelector("#draws").textContent = blackjackGame.draws;
        message = "You drew!";
        messageColor = "orange";
    }
    document.querySelector("#blackjack-result").textContent = message;
    document.querySelector("#blackjack-result").style.color = messageColor;
}

function resetLetsPlay(){
    document.querySelector("#blackjack-result").textContent = "Let's play";
    document.querySelector("#blackjack-result").style.color = "black";
}



