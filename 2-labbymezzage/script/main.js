"use strict";



var main = {

    //array med alla message-objekt
    messages: [],
    
    message_board: document.getElementById("message_board"),
    
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
    
        main.renderMessages(main.messages.length - 1);
    },
    
    
    //Skickar varje message-objekt i arrayen till renderMessage
    renderMessages: function()
    {
        //FLUSH
        main.message_board.innerHTML = "";
        
        for(var i = 0; i < main.messages.length;i++)
        {
            main.renderMessage(main.messages[i], i);    
        }
        
        //Skriv ut hur många meddelanden som finns
        document.getElementById("messageCount").innerHTML = "Antal meddelanden: " + main.messages.length;
        
    },
    
    //Skriver ut meddelandena i arrayen. Parametern: position i arrayen
    renderMessage: function(message, messagePosition)
    {
        
        //Alla element skapas.
        var divMessage = document.createElement("div");
        divMessage.setAttribute("class","message");
        
        var pMessage = document.createElement("p");
        var pTime = document.createElement("p");
        
        var footer = document.createElement("div");
        footer.setAttribute("class","messageFooter");
        
        //Texter som ska in i elementen läggs till
        pMessage.innerHTML = message.getHTMLText();
        var time = message.getDate().getHours() + ":" + message.getDate().getMinutes();
        pTime.innerHTML = time;
        
 
        //Lägger till knappar för att radera meddelandet och för att se tiden det skapades.
        var deleteButton = document.createElement("img");
        deleteButton.setAttribute("src","radera.gif");
        deleteButton.setAttribute("alt","knapp som raderar meddelandet");
        deleteButton.setAttribute("class","deleteButton");
        deleteButton.addEventListener("click", deleteMessage, false);
        function deleteMessage()
        {
            main.messages.splice(messagePosition,1);
            main.renderMessages();
        }
        
        var dateButton = document.createElement("img");
        dateButton.setAttribute("src","datum.gif");
        dateButton.setAttribute("alt","knapp som visar när meddelandet skrevs");
        dateButton.setAttribute("class","dateButton");
        dateButton.addEventListener("click", displayDate, false);
        function displayDate()
        {
            alert("Inlägget skapades den " + message.getDate().getDate() + "/" + message.getDate().getMonth() + " " + message.getDate().getFullYear() + " klockan " + time + ":" + message.getDate().getSeconds());
        }
        
       
        //Get in there!
        footer.appendChild(pTime);
        footer.appendChild(deleteButton);
        footer.appendChild(dateButton);
        
        divMessage.appendChild(pMessage);
        divMessage.appendChild(footer);
        
        main.message_board.appendChild(divMessage);

    }
    
    
    
    
    
};











