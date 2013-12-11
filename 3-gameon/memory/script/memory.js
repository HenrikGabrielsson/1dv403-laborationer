"use strict";

var Memory = 
{
    
    game_board: document.getElementById("game_board"),
    
    correctGuesses: 0,
    guesses: 0,

    //spelbrädet
    memoryBoard: [],
    
    //de gissade korten
    clickedCards: [],
    
    //variabler där element ska sparas
    cardDiv: null,
    cardPicture: null,
    cardLink: null,
    
    init:function () 
    {

        //skapar ett nytt spelbräde
        var submit = document.getElementById("submit_button");
        submit.addEventListener("click",Memory.getInput, false);
        
    },  
    
    
    //funktion som hämtar spelbrädets storlek från användaren.    
    getInput: function()
    {
        var errorP = document.getElementById("error_message");
        
        var height = document.getElementById("height").value;
        var width = document.getElementById("width").value;

        //Kontroll av indatan
        if(isNaN(height) || isNaN(width))
        {
            errorP.innerHTML = "Du måste skriva siffror.";    
        }
        else if( height < 1 || width < 1 )
        {
            errorP.innerHTML = "Både höjden och bredden måste vara minst 1 bricka";          
        }
        
        else if(width * height > 16 )
        {
            errorP.innerHTML = "Tyvärr, du får inte ha mer än 16 brickor på spelplanen.";    
        }
        
        else if( (width*height) % 2 !== 0)
        {
            errorP.innerHTML = "Tyvärr, du måste ha ett jämt antal brickor på planen.";    
        }

        else
        {
            errorP.innerHTML = null; 
            
            var form = document.getElementById("boardSizeForm");
            
            document.body.removeChild(form);
            Memory.createBoard(height, width);
        }

        
    },
    
    //funktion som skapar spelbrädet
    createBoard: function(height,width)
    {
        //här skapas spelplanen  
        Memory.memoryBoard = new RandomGenerator.getPictureArray(height, width);
        
        //funktion som fixar closure-problemet i loopen nedan på nåt sätt som bara aliens förstår.
        var sendToTryCard = function(j) {return function() {tryCard(j)}};

        //Spelbrädet byggs upp och "korten" tilldelas klasser med nummer(0,1,2,3) 
        //som kan jämföras med arrayen MemoryBoard och på så sätt kan man bestämma vad som finns på "baksidan"
        for(var i = 0; i < Memory.memoryBoard.length; i++)
        {

            Memory.cardDiv = document.createElement("div");
            Memory.cardDiv.setAttribute("class","card");
            
            Memory.cardPicture = document.createElement("img");
            Memory.cardPicture.setAttribute("src","pics/0.png");
            Memory.cardPicture.setAttribute("id",i );
            
            Memory.cardLink = document.createElement("a");
            Memory.cardLink.setAttribute("class",i );
            Memory.cardLink.addEventListener("click", sendToTryCard(i), false);

            if(i % width === 0)
            {
                Memory.cardDiv.setAttribute("class","card new_row_card");
            }
            
            Memory.cardLink.appendChild(Memory.cardPicture);
            Memory.cardDiv.appendChild(Memory.cardLink);
            Memory.game_board.appendChild(Memory.cardDiv);
        }
        
        //Funktion som visar korten. Parameter: klassens position i arrayen och på brädet.
        function tryCard(thisCardNumber)
        {
            Memory.clickedCards.push(thisCardNumber);
            
            //Vänd upp aktuellt kort
            var thisCardPicture = document.getElementById(thisCardNumber);
            thisCardPicture.setAttribute("src","pics/" + Memory.memoryBoard[thisCardNumber] + ".png");
            
            //Om två kort är uppvända...
            if(Memory.clickedCards.length == 2 && Memory.clickedCards[0] != Memory.clickedCards[1])
            {
                //Kolla om det är en korrekt gissning
                Memory.checkIfCorrect(  Memory.memoryBoard[Memory.clickedCards[0]],    Memory.memoryBoard[Memory.clickedCards[1]]  );
                
                //Öka räknaren och glöm de valda korten
                Memory.guesses++;
                document.getElementById("guess_count").innerHTML = "Antal gissningar: "+ Memory.guesses;
                Memory.clickedCards.length = 0;
            }
            
            //Om användaren klickar på samma kort två gånger
            else if(Memory.clickedCards[0] == Memory.clickedCards[1])
            {
                Memory.clickedCards.pop();
            }
                
            //är det inga nedvända kort kvar?
            if(Memory.correctGuesses == Memory.memoryBoard.length)
            {
                document.body.removeChild(document.getElementById("game_board"));
                document.body.removeChild(document.getElementById("guess_count"));
                document.getElementById("you_won").innerHTML = "Grattis! Du vann efter "+ Memory.guesses +" gissningar!";
                
            }

        }
            
            
    },
    
    //kollar om korten är lika eller inte, och gör sedan något
    checkIfCorrect: function(card1, card2)
    {
        var picture1;
        var picture2;
        
        
        
        if(card1 == card2)
        {
            Memory.correctGuesses += 2;
            
            //Tar bort länkarna, genom att be parentNoden döda sitt barn...
            var link1 = document.getElementsByClassName(Memory.clickedCards[0]);
            link1[0].parentNode.removeChild(link1[0]);
            var link2 = document.getElementsByClassName(Memory.clickedCards[1]);
            link2[0].parentNode.removeChild(link2[0]);
            
            
        }
        else
        {
            picture1 = document.getElementById(Memory.clickedCards[0]);
            picture2 = document.getElementById(Memory.clickedCards[1]);
            
            //döljer korten igen efter 1 sekund
            setTimeout(function(){picture1.src = "pics/0.png";}, 1000);
            setTimeout(function(){picture2.src = "pics/0.png";}, 1000);
        }
    }
}

window.onload = Memory.init;