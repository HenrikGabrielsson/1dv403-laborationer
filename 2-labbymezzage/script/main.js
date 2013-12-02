"use strict";



var main = {

    //array med alla message-objekt
    messages: [],
    
    //Main-funktionen
    init: window.onload = function()    
    {
        document.getElementById("messageCount").innerHTML = "Antal meddelanden: " + main.messages.length;
        
        var submit = document.getElementById("submit_button");
        submit.addEventListener("click", main.getMessage, false);
    
    },
    
    //Funktion som hämtar meddelandet från användaren
    getMessage:function ()
    {
        //Hämtar och sparar meddelandet i arrayen
        var message_text = document.getElementById("new_message");
        main.messages.push(new Message( message_text.value, new Date() ));
        
        //tömmer input-fältet.
        message_text.value = "";
    
        main.renderMessage(main.messages.length - 1);
    },
    
    //Skriver ut meddelandena i arrayen. Parametern: position i arrayen
    renderMessage: function(messagePosition)
    {
        document.getElementById("messageCount").innerHTML = "Antal meddelanden: " + main.messages.length;
        
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
        pMessage.innerHTML = main.messages[messagePosition].getHTMLText();
        var time = main.messages[messagePosition].getDate().getHours() + ":" + main.messages[messagePosition].getDate().getMinutes();
        pTime.innerHTML = time;
        
        
        //Lägger till knappar för att radera meddelandet och för att se tiden det skapades.
        var deleteButton = document.createElement("img");
        deleteButton.setAttribute("src","radera.gif");
        deleteButton.setAttribute("alt","knapp som raderar meddelandet");
        deleteButton.setAttribute("class","deleteButton");
        deleteButton.addEventListener("click", deleteMessage, false);
        function deleteMessage()
        {
            //Lägg till kod
        }
    
        
        
        var dateButton = document.createElement("img");
        dateButton.setAttribute("src","datum.gif");
        dateButton.setAttribute("alt","knapp som visar när meddelandet skrevs");
        dateButton.setAttribute("class","dateButton");
        dateButton.addEventListener("click", displayDate, false);
        function displayDate()
        {
            alert("Inlägget skapades den " + main.messages[messagePosition].getDate().getDate() + "/" + main.messages[messagePosition].getDate().getMonth() + " " +main.messages[messagePosition].getDate().getFullYear() + " klockan " + time + ":" + main.messages[messagePosition].getDate().getSeconds());
        }
        
        
        //Get in there!
        footer.appendChild(pTime);
        footer.appendChild(deleteButton);
        footer.appendChild(dateButton);
        
        message.appendChild(pMessage);
        message.appendChild(footer);
        
        message_board.appendChild(message);
        
    }
    
    
    
    
    
};











