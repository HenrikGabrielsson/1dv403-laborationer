"use strict";

var Memory = 
{
    
    //Här sparas antalet gissningar
    guesses: 0,
    
    boardHeight:0,
    boardWidth:0,
    
    
    init:function () 
    {

        //skapar ett nytt spelbräde
        var submit = document.getElementById("submit_button");
        submit.addEventListener("click",Memory.getBoardSize, false);
        
        var memoryBoard = new RandomGenerator.getPictureArray(Memory.boardHeight, Memory.boardWidth);
        
    },  
    
    
    //funktion som hämtar spelbrädets storlek från användaren.    
    getBoardSize: function()
    {
        var errorP = document.getElementById("error_message");
        
        var height = document.getElementById("height").value;
        var width = document.getElementById("width").value;

        //Kontroll av indatan
        if(isNaN(height) || isNaN(width))
        {
            errorP.innerHTML = "Du måste skriva siffror.";    
        }
        else if((height > 8 || height < 1 ) || (width > 8 || width < 1 ))
        {
            errorP.innerHTML = "Höjden och bredden måste vara mellan 1-8 brickor.";          
        }
        else if( (width*height) % 2 !== 0)
        {
            errorP.innerHTML = "Tyvärr, du måste ha ett jämt antal brickor på planen.";    
        }
        else
        {
            errorP.innerHTML = null;  
            Memory.boardHeight = height;
            Memory.boardWidth = width;
        }

        
    },
};

window.onload = Memory.init;