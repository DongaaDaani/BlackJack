let blackJackGame={
    'you' : {'scoreSpan':'#your-backjack-result','div':'#your-box','score':0},
    'dealer' : {'scoreSpan':'#dealer-backjack-result','div':'#dealer-box','score':0},
    'cards':['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]},
    'wins':0,
    'losses':0,
    'draws':0,
    'isStand':false,
    'turnsOver':false,

}

var money = prompt('Add meg a játszani kívánt összeget');
document.querySelector('#balance').textContent=money;
const YOU = blackJackGame['you'];
const DEALER = blackJackGame['dealer'];
const hitSound = new Audio('sounds/swish.m4a');
const winSound = new Audio('sounds/cash.mp3');
const lossSound = new Audio('sounds/aww.mp3');
document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);
document.querySelector('#blackjack-deal-button').addEventListener('click',blackJackDeal);
document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);
document.querySelector('#blackjack-bet-button').addEventListener('click',bet);

function blackjackHit(){
    if(blackJackGame['isStand']===false){
    let card = randomCard();
    console.log(card);

   showCard(card,YOU);
   updateScore(card,YOU);
   showScore(YOU);
    }
   
}
function bet(){
    var betAmounte = document.querySelector('.betInput');
    console.log(betAmounte.value); 
    document.querySelector('#balance').textContent=  money - betAmounte.value;
}

function showCard(card,activePlayer){
    if(activePlayer['score']<=21){
        let cardImage = document.createElement('img');
        cardImage.src=`images/${card}.png`
        cardImage.setAttribute('height','100');
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
  
}

function blackJackDeal(){
  //  showResult(computerWinner());
   // computerWinner();
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
    for(let i = 0 ;i<yourImages.length; i++){
        yourImages[i].remove();
        }
   
        for(let i = 0 ;i<dealerImages.length; i++){
            dealerImages[i].remove();
            }

YOU['score']=0;
DEALER['score']=0;    
document.querySelector('#your-backjack-result').textContent = 0;
document.querySelector('#dealer-backjack-result').textContent = 0;
document.querySelector('#blackjack-result').textContent = 'let s play '
blackJackGame['isStand']=false;
}

function randomCard(){
    let randomindex = Math.floor(Math.random()*13);
    return blackJackGame['cards'][randomindex];
}

function updateScore(card,activePlayer){
    if(card==='A'){
        if(activePlayer['score'] + blackJackGame['cardsMap'][card][1]<=21){
            activePlayer['score']+= blackJackGame['cardsMap'][card][1];
        }
        else{
            activePlayer['score']+= blackJackGame['cardsMap'][card][0];
        }
       }
       else{
        activePlayer['score'] += blackJackGame['cardsMap'][card]; //KEY lesz a card
       }
   
   }

   function showScore(activePlayer){
       if(activePlayer['score']>21){
           document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST'
           
       }
       else{
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
       }
        
   }
   async function dealerLogic(){
       blackJackGame['isStand']=true;
       while((DEALER['score'] <= YOU['score'] )  && YOU['score'] <= 21  ){
        let card = randomCard();
        showCard(card,DEALER);
        updateScore(card,DEALER);
        showScore(DEALER);
        await sleep(1000);
       }
       let winner = computerWinner();
       showResult(winner);
       /*
       blackJackGame['isStand']=true;
       let card = randomCard();
       showCard(card,DEALER);
       updateScore(card,DEALER);
       showScore(DEALER);
       if(DEALER['score']> YOU['score'] || YOU['score'] > 21 ){
           let winner = computerWinner();
           showResult(winner);*/
       }
     
   function sleep(ms){
       return new Promise(resolve => setTimeout(resolve,ms));
   }



function computerWinner(){
let winner;
    if(( (YOU['score'] > DEALER['score'] ) && YOU['score']<21 ) ||  (DEALER['score'] > 21  )){
        console.log('you win');
        blackJackGame['wins']++;
        winner=YOU;
    }
    else if(YOU['score']===DEALER['score']){
        console.log('DRAW ! ');
        blackJackGame['draws']++;
    }
    else if((YOU['score']< DEALER['score'] ) && DEALER['score'] < 22){
        console.log('you lose');
        winner=DEALER;
        blackJackGame['losses']++;
    }
    else if(YOU['score'] > 21 ){
        console.log('you lose');
        winner=DEALER;
        blackJackGame['losses']++;
    }
    console.log(winner);
    return winner;
   }

 function showResult(winner){
    let message, massageColor;
    if(winner===YOU){
        message='You won !';
        massageColor = 'green';
        document.querySelector('#wins').textContent = blackJackGame['wins'];
        winSound.play();
    }
    else if(winner === DEALER){
        message ='You lost';
        massageColor = 'red';
        document.querySelector('#losess').textContent = blackJackGame['losses'];
        lossSound.play();
    }
    else{
        message='you drew';
        massageColor='black';
        document.querySelector('#draws').textContent = blackJackGame['draw'];
    }
    document.querySelector('#blackjack-result').textContent = message;
    
}

// 7 óra 7 perc                          