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

            var cardDiv = document.createElement("div");
            cardDiv.setAttribute("class","card");
            
            var cardPicture = document.createElement("img");
            cardPicture.setAttribute("src","pics/0.png");
            cardPicture.setAttribute("id",i );
            
            var cardLink = document.createElement("a");
            cardLink.setAttribute("class",i );
            cardLink.addEventListener("click", sendToTryCard(i), false);

            if(i % width === 0)
            {
                cardDiv.setAttribute("class","card new_row_card");
            }
            
            cardLink.appendChild(cardPicture);
            cardDiv.appendChild(cardLink);
            Memory.game_board.appendChild(cardDiv);
        }
        
        //Funktion som visar korten och bestämmer om det var en korrekt gissning. Parameter: klassens position i arrayen och på brädet.
        function tryCard(thisCardNumber)
        {
            alert(thisCardNumber);
            Memory.clickedCards.push(thisCardNumber);
            
            //Om ett eller inget kort är uppvänt
            if(Memory.clickedCards.length <= 2)
            {
                var thisCardPicture = document.getElementById(thisCardNumber);
                var thisCardLink = document.getElementById(thisCardNumber);
                thisCardPicture.setAttribute("src","pics/" + Memory.memoryBoard[thisCardNumber] + ".png");
            }
            
            
            //Om två kort är uppvända...
            if(Memory.clickedCards.length >= 2)
            {
                
                if(Memory.memoryBoard[Memory.clickedCards[0]] == Memory.memoryBoard[Memory.clickedCards[1]]);
                {
                    
                    Memory.correctGuesses++;
                    Memory.guesses++;
                    Memory.clickedCards.length = 0;
                    
                }
                
                if(Memory.memoryBoard[Memory.clickedCards[0]] != Memory.memoryBoard[Memory.clickedCards[1]])
                {
                    Memory.guesses++;
                    Memory.clickedCards.length = 0;
                }
            }
                
            //är det inga nedvända kort kvar?
            if(Memory.correctGuesses == Memory.memoryBoard.length / 2)
            {
            }
                
            
            
        }
            
                
            
    }
};

window.onload = Memory.init;