"use strict";



var init = {

    //array med alla message-objekt
    messages: [],
    
    //Main-funktionen
    init: window.onload = function()    
    {
        document.getElementById("messageCount").innerHTML = "Antal meddelanden: " + init.messages.length;
        
        var submit = document.getElementById("submit_button");
        submit.addEventListener("click", getMessage, false);
    
    },
    
};


//Funktion som hämtar meddelandet från användaren
function getMessage ()
{
    //Hämtar och sparar meddelandet i arrayen
    var message_text = document.getElementById("new_message");
    init.messages.push(new Message( message_text.value, new Date() ));
    
    //tömmer input-fältet.
    message_text.value = "";

    renderMessage(init.messages.length - 1);
}


//Skriver ut meddelandena i arrayen. Parametern: position i arrayen
function renderMessage(messagePosition)
{
    document.getElementById("messageCount").innerHTML = "Antal meddelanden: " + init.messages.length;
    
    var message_board = document.getElementById("message_board");
    
    var message = document.createElement("div");
    message.setAttribute("id","message"+ messagePosition);
    
    var p = document.createElement("p");
    p.innerHTML = init.messages[messagePosition].getText();
    
    message.appendChild(p);
    message_board.appendChild(message);
    
}



