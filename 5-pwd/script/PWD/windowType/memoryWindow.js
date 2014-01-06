"use strict";

var PWD = PWD || {};
PWD.windowType = PWD.windowType || {};



//The Memory game(inherits from Window) displays a game of memory
PWD.windowType.memoryWindow = function(width, height) 
{
    //set width and height from WIndow-class
    PWD.windowType.BasicWindow.call(this, width, height);
    

};
PWD.windowType.memoryWindow.prototype = new PWD.windowType.BasicWindow;



//this creates a new memory game
PWD.windowType.memoryWindow.prototype.createMemoryWindow = function()
{
    var newWindow = this.createBasicWindow();

    //array for cards clicked
    this.clickedCards = [];
    
    //guesses and correct guesses..counters
    this.guesses = 0;
    this.correctGuesses = 0; 

    //icon and title
    this.windowIcon.setAttribute("src","pics/memory.png");
    this.windowTitle.appendChild(document.createTextNode("Memory"));
    
    var statusMessage = this.statusMessage;
    
    this.game_board = document.createElement("div");
    this.game_board.setAttribute("class","game_board");
    var thisGame_board = this.game_board;
    
    this.memoryArray = new PWD.RandomGenerator.getPictureArray(4,4);
    
    var memoryArray = this.memoryArray;
    var clickedCards = this.clickedCards;
    var guesses = this.guesses;
    var correctGuesses = this.correctGuesses;
    
    //function that shows the picture on the clicked card.
    var tryCard = function(thisCardNumber)
    {
        
        //add card to array of clicked cards
        clickedCards.push(thisCardNumber);
            
        //et the picture that was clicked so it can be flipped over
        var thisCardPicture;
        for(var i = 0; i < thisGame_board.childNodes.length;i++)
        {
            if(thisGame_board.childNodes[i].firstChild && thisGame_board.childNodes[i].firstChild.className == thisCardNumber)
            {
                thisCardPicture = thisGame_board.childNodes[i].firstChild;
                thisCardPicture.setAttribute("src","pics/" + memoryArray[thisCardNumber] + ".png");
            }
        }
        
        //if two cards have been clicked(and not the same card twice)
        if(clickedCards.length === 2 && clickedCards[0] != clickedCards[1])
        {
            //check if guess is correct
            checkIfCorrect(memoryArray[clickedCards[0]], memoryArray[clickedCards[1]])
            
            //guesscounter++
            guesses++;
            statusMessage.innerHTML = "Antal gissningar: "+ guesses; 
            clickedCards.length = 0; //flush...
        }
        
        //if the same card was clicked twice
        else if(clickedCards[0] == clickedCards[1])
            {
                clickedCards.pop();
            }
        
        //if there are no cards left
        if(correctGuesses === memoryArray.length)
        {
            statusMessage.innerHTML = "Grattis! Du vann efter "+ guesses +" gissningar!";
        }
    }
    
    //function that takes two cards as arguments and checks if they have the same picture
    var checkIfCorrect = function(card1, card2)
    {

        var link1;
        var link2;

        //two loops that gets the clicked cardlinks
        for(var i = 0; i < thisGame_board.childNodes.length;i++)
        {
            if(thisGame_board.childNodes[i].className == clickedCards[0])
            {
                link1 = thisGame_board.childNodes[i]
            }
        }
        for(var i = 0; i < thisGame_board.childNodes.length;i++)
        {
            if(thisGame_board.childNodes[i].className == clickedCards[1])
            {
                link2 = thisGame_board.childNodes[i]
            }
        }    



        //if the cards are alike, the links that were clicked will be removed         
        if(card1 === card2)
        {
            //picture is popped out from link and placed in game_board
            thisGame_board.insertBefore(link1.firstChild, link1);
            thisGame_board.insertBefore(link2.firstChild, link2);
            
            //destroy links
            thisGame_board.removeChild(link1);
            thisGame_board.removeChild(link2);
            
            //two correct cards are counted
            correctGuesses += 2;

        }
        
        //else..the cards are flipped back after 1 second
        else
        {
            setTimeout(function(){link1.firstChild.src = "pics/0.png";}, 1000);
            setTimeout(function(){link2.firstChild.src = "pics/0.png";}, 1000);
        }
    }
    
    //loop that creates each card    
    for(var i = 0; i < this.memoryArray.length; i++)
    {

        
        var cardPicture = document.createElement("img");
        cardPicture.setAttribute("src","pics/0.png");
        cardPicture.setAttribute("class",i);
        
        var cardLink = document.createElement("a");
        cardLink.setAttribute("class",i );
        cardLink.addEventListener("click",function(i)
        {
            return function()
            {
                tryCard(i);
            }
        }(i),false)

        cardLink.appendChild(cardPicture);
        this.game_board.appendChild(cardLink);
    }
    
    this.windowContent.appendChild(this.game_board);
    
    return newWindow;
}


