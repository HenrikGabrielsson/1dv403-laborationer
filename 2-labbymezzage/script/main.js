"use strict";



var init = {

    //array med alla message-objekt
    messages: [],
    
    //Main-funktionen
    init: window.onload = function()    
    {
        var submit = document.getElementById("submit_button");
        
        submit.addEventListener("click", getMessage, false);
        
    },
    
};

function getMessage ()
{
    var message_text = document.getElementById("new_message");
    
    init.messages.push(new Message( message_text.value, new Date() ));
    
}


