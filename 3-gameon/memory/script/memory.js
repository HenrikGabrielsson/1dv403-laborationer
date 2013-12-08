"use strict";

var Memory = 
{
    
    game_board: document.getElementById("game_board"),
    
    //Här sparas antalet gissningar
    guesses: 0,

    memoryBoard: [],
    
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
            var memoryBoard = new RandomGenerator.getPictureArray(height, width);
            

            
            for(var i = 0; i < memoryBoard.length; i++)
            {
                var card = document.createElement("div");
                card.setAttribute("class","card");
                
                if(i % width === 0)
                {
                card.setAttribute("class","card new_row_card");
                }
                
                Memory.game_board.appendChild(card);
            }
            
    }
};

window.onload = Memory.init;