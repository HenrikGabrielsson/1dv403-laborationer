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
    
    //Alla element skapas.
    var message = document.createElement("div");
    message.setAttribute("id","message"+ messagePosition);
    message.setAttribute("class","message");
    
    var pMessage = document.createElement("p");
    var pTime = document.createElement("p");
    var footer = document.createElement("div");
    footer.setAttribute("class","messageFooter");
    
    //Texter som ska in i elementen läggs till
    pMessage.innerHTML = init.messages[messagePosition].getHTMLText();
    var time = init.messages[messagePosition].getDate().getHours() + ":" + init.messages[messagePosition].getDate().getMinutes();
    pTime.innerHTML = time;
    
    //Lägger till knappar för att radera meddelandet och för att se tiden det skapades.
    var deleteButton = document.createElement("img");
    deleteButton.setAttribute("src","radera.gif");
    deleteButton.setAttribute("alt","knapp som raderar meddelandet");
    deleteButton.setAttribute("class","deleteButton");
    
    var dateButton = document.createElement("img");
    dateButton.setAttribute("src","datum.gif");
    dateButton.setAttribute("alt","knapp som visar när meddelandet skrevs");
    dateButton.setAttribute("class","dateButton");
    dateButton.addEventListener("click", displayDate, false);
    
    function deleteMessage()
    {
        init.messages.pop()        
    }
    
    function displayDate()
    {
        alert("Inlägget skapades den " + init.messages[messagePosition].getDate().getDate() + "/" + init.messages[messagePosition].getDate().getMonth() + " " +init.messages[messagePosition].getDate().getFullYear() + " klockan " + time + ":" + init.messages[messagePosition].getDate().getSeconds());
    }
    
    //Get in there!
    footer.appendChild(pTime);
    footer.appendChild(deleteButton);
    footer.appendChild(dateButton);
    
    message.appendChild(pMessage);
    message.appendChild(footer);
    
    message_board.appendChild(message);
    
}



